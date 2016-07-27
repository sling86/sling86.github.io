<!--<meta http-equiv="refresh" content="3;URL=/" />-->
<?php 

require_once __DIR__ . '/g-recaptcha/autoload.php';
// Register API keys at https://www.google.com/recaptcha/admin
$siteKey = '6LdMzhUTAAAAAPuIAx6M7KX4szqa8RuBktm4G7t5';
$secret = '6LdMzhUTAAAAAO4yPkA7W5ZxUHGaFos4Apg2r29D';
// reCAPTCHA supported 40+ languages listed here: https://developers.google.com/recaptcha/docs/language
$lang = 'en';
// define variables and set to empty values
$nameErr = $emailErr = $messageErr = "";
$name = $email = $message = "";

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}

?>

    <html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Contact Form</title>
        <style type="text/css">
            body {
                margin: 1em 5em 0 5em;
                font-family: sans-serif;
            }
            
            fieldset {
                display: inline;
                padding: 1em;
            }
        </style>
    </head>

    <body>
        <h1>Contact Form</h1>
        <?php if ($siteKey === '' || $secret === ''): ?>
            <h2>ERROR! - No keys</h2>
            <?php
            elseif (isset($_POST['g-recaptcha-response'])):
            // The POST data here is unfiltered because this is an example.
            // In production, *always* sanitise and validate your input'
        
                ///ADD CHECKS!
        
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                   if (empty($_POST["name"])) {
                     $nameErr = "Name is required";
                   } else {
                     $name = test_input($_POST["name"]);
                   }

                   if (empty($_POST["email"])) {
                     $emailErr = "Email is required";
                   } else {
                     $email = test_input($_POST["email"]);
                   }

                   if (empty($_POST["message"])) {
                     $message = "";
                   } else {
                     $message = test_input($_POST["message"]);
                   }

                }
        
    ?>
                <h2><tt>POST</tt> data</h2>
                <tt><pre><?php var_export($_POST); ?></pre></tt>
                <?php
// If the form submission includes the "g-captcha-response" field
// Create an instance of the service using your secret
    $recaptcha = new \ReCaptcha\ReCaptcha($secret);

// Make the call to verify the response and also pass the user's IP address
    $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

    if ($resp->isSuccess()):
// If the response is a success, that's it!
        
        ?>

                    <h2>Success!</h2>
                    <p>That's it. Everything is working. Go integrate this into your real project.</p>
                    <p><a href="/g-recaptcha/example-captcha.php">Try again</a></p>

                    <?php
    else:
// If it's not successful, then one or more error codes will be returned.
        ?>
                        <h2>Something went wrong</h2>
                        <p>The following error was returned:
                            <?php
            foreach ($resp->getErrorCodes() as $code) {
                echo '<tt>' , $code , '</tt> ';
            }
            ?></p>
                        <?php
    endif;
else:
// Add the g-recaptcha tag to the form you want to include the reCAPTCHA element
    ?>
                            <p>Complete the reCAPTCHA then submit the form.</p>
                            <form action="<?php echo basename(__FILE__)  ?>" method="post">
                                <fieldset>

                                    <table>
                                        <tr>
                                            <td>Your name:</td>
                                            <td>
                                                <input name="name" required type="text" id="name" placeholder="Name">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email address:</td>
                                            <td>
                                                <input name="email" required type="email" id="email" placeholder="Email">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Comment:</td>
                                            <td>
                                                <textarea name="message" required rows="6" id="message" placeholder="Message"></textarea>
                                            </td>
                                        </tr>
                                    </table>
                                    <br/>
                                    <div class="g-recaptcha" data-sitekey="<?php echo $siteKey; ?>"></div>
                                    <script type="text/javascript" src="https://www.google.com/recaptcha/api.js?hl=<?php echo $lang; ?>">
                                    </script>
                                    <p>
                                        <input type="submit" value="Submit" />
                                    </p>
                                </fieldset>
                            </form>
                            <?php endif; ?>
    </body>

    </html>

    <?php
if ($_POST['email']<>"") { 

	$name = strip_tags($_POST["name"]);
	$email = strip_tags($_POST["email"]);
	$message = strip_tags($_POST["message"]);

    // multiple recipients
	$to = 'Tony <tony@contractcandles.com>' . ', '; // note the comma
	$to .= 'Other Tony <t.malins@gmail.com>';
	
	$subject = 'Contract Candles - Site Contact Form';
	
	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	// Additional headers
	$headers .= 'From: ' . $name . ' <'. $email . '>' . "\r\n";
	$headers .= 'Reply-To: ' . $name . ' <'. $email . '>' . "\r\n";
	$headers .= 'Bcc: tony@contractcandles.com' . "\r\n";
	
	$message = '
	<html>
	<head></head>
	
	<body>
		<div>
			<p>Name: ' . $name . '</p>
			<p>Email: <a href="mailto:' . $email . '">' . $email . '</a></p>
			<p>Message: ' . $message . '</p>
		</div>
	</body>
	</html>';
	

// Mail it
	
    mail($to, $subject, $message, $headers) or die ("Failure"); 
	
	echo 'This ' . 'string ' . 'was ' . 'made ' . 'with concatenation.' . "\n";
?>
        <p>Your message was sent, taking you back to the site!</p>
        <?php } else { ?>
            // ELSE BIT
            <?php }; ?>