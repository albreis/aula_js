<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$config = json_decode(file_get_contents('config.smtp.json'));
try {
    //Server settings
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = $config->debug; // debugging: 1 = errors and messages, 2 = messages only
    $mail->Host = $config->host;
    $mail->Port = $config->port; // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->SMTPSecure = $config->encryption;
    $mail->CharSet = $config->charset;
    $mail->SMTPAuth = true;
    $mail->Username = $config->username; 
    $mail->Password = $config->password;
    $mail->setFrom($config->from);

    //Recipients
    foreach($config->to as $recipient) {
      $mail->addAddress($recipient->email, $recipient->name); // Add a recipient
      $mail->replyTo($recipient->email, $recipient->name); // Reply to
    }

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Mensagem enviado do formulário de contato';
    $mail->Body    = "Nome: {$_POST['nome']}<br/>E-mail: {$_POST['email']}<hr/>: {$_POST['msg']}";
    $mail->AltBody = strip_tags($mail->Body);

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}