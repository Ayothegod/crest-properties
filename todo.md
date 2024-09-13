

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












model Otp {
  id        String   @id
  userId    String
  otp       String
  expiresAt DateTime
  user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
}

const otp = generateOTP(6);
const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
const databaseOtp = await prisma.otp.create({
  data: {
    otp: otp,
    userId: existingUser.id,
    expiresAt: expiresAt,
  },
});

const Queue = require('bull');
const prisma = require('@prisma/client').PrismaClient;
const db = new prisma();

// Create a Bull queue
const cleanupQueue = new Queue('cleanupQueue');

// Add a job to clean up expired OTPs
function scheduleCleanup() {
  cleanupQueue.add(
    {}, // No data needed for this job
    { repeat: { every: 5 * 60 * 1000 } } // Run every 5 minutes
  );
}

// Process the cleanup queue
cleanupQueue.process(async () => {
  try {
    await db.otp.deleteMany({
      where: {
        expiresAt: { lt: new Date() } // Delete OTPs where expiration time is less than now
      },
    });
    console.log('Expired OTPs deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired OTPs:', error);
  }
});

// Schedule cleanup when starting your app
scheduleCleanup();
