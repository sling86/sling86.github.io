<?php 
if ($_POST['email']<>"") { 
    
	$to = "tony.malins@contractcandles.com";

	$subject = "Contract Candles - Site Contact Form";
	
	$headers = "From: " . strip_tags($_POST['req-email']) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($_POST['req-email']) . "\r\n";
	$headers .= "CC: susan@example.com\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	
	$message = "<html><body>";
	$message .= "<div>";
	$message .= "<p>Name: " . strip_tags($_POST['name']) . "</p>";
	$message .= "<p>Email: <a href='mailto:" . strip_tags($_POST['email']) . "'>" . strip_tags($_POST['email']) . "</a></p>";
	$message .= "<p>Message: " . strip_tags($_POST['message']) . "</p>";
	$message .= "</div>";
	$message .= "</body></html>";
	
    mail($to, $subject, $message, $headers) or die ("Failure"); 
?> 
Your message was sent
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
<td><textarea name="comment" cols="45" rows="6" id="comment" class="bodytext"></textarea></td>
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