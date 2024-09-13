

### Ideas
- the featured section should contain listings by people that have pro membership
- make the filters hidden on mobile, and make the filter smaller but meaningful



prisma
add auth
-build auth ui
finish onvboarding
start agenets profile

forget password - generate and enter code -> also add rate limit
true -> fom to update password
-> back to login
-> also add

middleware to blog people from viewing some sites


- get email, access account
- generate otp
- send otp to email
- save otp to db using that users email and id -how to make otp delete in 5 mins after sending

- once he enters the otp, check if it matches the one in db
- if yes, then continue

- generate 

<!-- <div>
<h2>Hi `${existingUser.fullname}`</h2>
<br/>
<p>We received a request related to your account. Please note that this request will expire in 30 minutes. If you do not complete the required 
action before this time, you may need to initiate the process again.</p>
<br/>
<p>If you didn’t make this request, you can safely ignore this email.</p>
<br/>
<p>Thank you for being part of Crest Properties!</p>
<br/>
<br/>
<p>Best regards,</p>
<h4>The Crest Properties Team</h4>
</div> -->