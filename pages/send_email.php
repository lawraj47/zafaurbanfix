<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Anti-spam honeypot
    if (!empty($_POST['website'])) {
        header('Location: contact.html?status=error');
        exit;
    }
    
    // Collect and sanitize data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $service = htmlspecialchars(trim($_POST['service']));
    $location = htmlspecialchars(trim($_POST['location']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate required fields
    $errors = [];
    if (empty($name)) $errors[] = "Nombre es requerido";
    if (!$email) $errors[] = "Email válido es requerido";
    if (empty($message)) $errors[] = "Mensaje es requerido";
    if (empty($_POST['privacy'])) $errors[] = "Debes aceptar la política de privacidad";
    
    if (!empty($errors)) {
        header('Location: contact.html?status=error');
        exit;
    }
    
    // Prepare email
    $to = "info@zafaurbanfix.com";
    $subject = "📋 Nueva Solicitud de Presupuesto - ZafaUrbanFix";
    
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
            .content { padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #2c3e50; display: inline-block; width: 150px; }
            .value { color: #555; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2 style='margin: 0; color: #2c3e50;'>Nueva Solicitud de Presupuesto</h2>
                <p style='margin: 5px 0 0 0; color: #7f8c8d;'>Formulario de contacto - ZafaUrbanFix</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Nombre:</span>
                    <span class='value'>$name</span>
                </div>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>$email</span>
                </div>
                <div class='field'>
                    <span class='label'>Teléfono:</span>
                    <span class='value'>" . ($phone ?: 'No proporcionado') . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Servicio:</span>
                    <span class='value'>$service</span>
                </div>
                <div class='field'>
                    <span class='label'>Ubicación:</span>
                    <span class='value'>" . ($location ?: 'No proporcionada') . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Mensaje:</span><br>
                    <span class='value' style='display: inline-block; margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px; width: 100%;'>$message</span>
                </div>
                <div style='margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px;'>
                    <strong>📅 Enviado el:</strong> " . date('d/m/Y H:i:s') . "<br>
                    <strong>🌐 Desde:</strong> " . $_SERVER['HTTP_HOST'] . "
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "From: ZafaUrbanFix Website <noreply@zafaurbanfix.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $subject, $email_body, $headers)) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - $email - $service - SUCCESS\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        header('Location: contact.html?status=success');
    } else {
        // Log failed submission
        $log_entry = date('Y-m-d H:i:s') . " - $email - $service - FAILED\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        header('Location: contact.html?status=error');
    }
} else {
    header('Location: contact.html');
}
?>