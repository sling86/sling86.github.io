<!--<meta http-equiv="refresh" content="3;URL=/" />-->
<?php 
if ($_POST['email']<>"") { 

	$name = strip_tags($_POST["name"]);
	$email = strip_tags($_POST["email"]);
	$comment = strip_tags($_POST["message"]);

    // multiple recipients
	$to = 'Tony <tony@contractcandles.com>' . ', '; // note the comma
	$to .= 'Other tony <t.malins@gmail.com>';
	
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
			<p>Message: ' . $comment . '</p>
		</div>
	</body>
	</html>';
	

// Mail it
	
	
    mail($to, $subject, $message, $headers) or die ("Failure"); 
	
	echo 'This ' . 'string ' . 'was ' . 'made ' . 'with concatenation.' . "\n";
?> 
<p>Your message was sent, taking you back to the site!</p>
<?php 
} else { 
?> 
<form action="contact.php" method="post">
<table width="400" border="0" cellspacing="2" cellpadding="0">
<tr>
<td width="29%" class="bodytext">Your name:</td>
<td width="71%"><input name="name" type="text" id="name" size="32"></td>
</tr>
<tr>
<td class="bodytext">Email address:</td>
<td><input name="email" type="text" id="email" size="32"></td>
</tr>
<tr>
<td class="bodytext">Comment:</td>
<td><textarea name="message" cols="45" rows="6" id="message" class="bodytext"></textarea></td>
</tr>
<tr>
<td class="bodytext"> </td>
<td align="left" valign="top"><input type="submit" name="Submit" value="Send"></td>
</tr>
</table>
</form> 
<?php 
}; 
?>