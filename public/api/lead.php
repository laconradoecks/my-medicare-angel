<?php
/**
 * Lead delivery for the My Medicare Angel forms.
 *
 * The site posts JSON here (see src/lib/forms.ts) and this mails it on. It runs
 * on the site's own cPanel hosting, so enquiries never pass through a
 * third-party form service.
 *
 * Before sending it checks: a known form name, a name and a way to reply, an
 * untouched honeypot field, sane lengths, and a per-IP hourly limit.
 *
 * Written for PHP 7.4 and up, which covers every current cPanel default.
 */

$TO = 'adythan@gmail.com';
// Must be on this domain, or the host's mail server will not accept it.
$FROM = 'noreply@mymedicareangel.com';
$MAX_PER_HOUR = 10;
$FORMS = array('help', 'contact', 'book', 'refer');

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

function reply($code, $payload) {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, array('ok' => false, 'error' => 'POST only'));
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    reply(400, array('ok' => false, 'error' => 'Expected JSON'));
}

$form = isset($data['form']) ? (string) $data['form'] : '';
if (!in_array($form, $FORMS, true)) {
    reply(400, array('ok' => false, 'error' => 'Unknown form'));
}

// Honeypot: the field is hidden, so only a bot fills it in. Answer as though
// the message went through, which tells the bot nothing.
if (!empty($data['website'])) {
    reply(200, array('ok' => true));
}

$pick = function ($keys) use ($data) {
    foreach ($keys as $key) {
        if (isset($data[$key]) && trim((string) $data[$key]) !== '') {
            return trim((string) $data[$key]);
        }
    }
    return '';
};

$name = $pick(array('name', 'yourName'));
$contact = $pick(array('phone', 'contact', 'yourPhone'));
if ($name === '' || $contact === '') {
    reply(400, array('ok' => false, 'error' => 'Missing name or contact details'));
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : 'unknown';
$bucket = sys_get_temp_dir() . '/mma-leads-' . md5($ip) . '.txt';
$now = time();
$hits = array();
if (is_readable($bucket)) {
    $recent = explode(',', (string) file_get_contents($bucket));
    foreach ($recent as $stamp) {
        $stamp = (int) $stamp;
        if ($stamp > $now - 3600) {
            $hits[] = $stamp;
        }
    }
}
if (count($hits) >= $MAX_PER_HOUR) {
    reply(429, array('ok' => false, 'error' => 'Too many submissions, please call us instead'));
}
$hits[] = $now;
@file_put_contents($bucket, implode(',', $hits));

$lines = array('New ' . $form . ' enquiry from mymedicareangel.com', '');
foreach ($data as $key => $value) {
    if ($key === 'website' || $key === 'form') {
        continue;
    }
    if (is_array($value)) {
        $value = implode(', ', array_map('strval', $value));
    }
    $value = trim((string) $value);
    if ($value === '') {
        continue;
    }
    $label = ucfirst(trim(preg_replace('/([A-Z])/', ' $1', (string) $key)));
    $lines[] = str_pad($label . ':', 18) . mb_substr($value, 0, 2000);
}
$lines[] = '';
$lines[] = 'Sent ' . date('c') . ' from ' . $ip;
$body = implode("\n", $lines);

$clean = function ($value) {
    return trim(preg_replace('/[\r\n]+/', ' ', (string) $value));
};
$subject = 'Website enquiry: ' . ucfirst($form) . ' - ' . mb_substr($clean($name), 0, 60);

$headers = 'From: My Medicare Angel <' . $FROM . '>' . "\r\n"
    . 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
// Only when they gave an email address; the forms mostly collect phone numbers.
if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
    $headers .= 'Reply-To: ' . $clean($contact) . "\r\n";
}

$sent = @mail($TO, $subject, $body, $headers, '-f' . $FROM);
if (!$sent) {
    reply(502, array('ok' => false, 'error' => 'Could not send the message'));
}

reply(200, array('ok' => true));
