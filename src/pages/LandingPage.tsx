import { useNavigate } from "react-router-dom";
import bgImage from "../assets/landing-page-bg.jpg";
import Button from "../components/Button";
import LandingCard from "../components/LandingCard";
import { motion } from "framer-motion";

// Animation Variants
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.15 },
  },
};

const word = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: (custom: number) => ({
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    }),
  },
};

function LandingPage() {
  const navigate = useNavigate();
  const HeadingText = "Revolutionize Your Fitness Journey with AI";

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full md:w-[calc(100%-160px)] lg::w-[calc(100%-220px)] xl:w-[calc(100%-320px)] 2xl:w-[calc(100%-520px)] flex flex-col gap-10"
        initial="hidden"
        animate="visible"
      >
        {/* HEADER */}
        <motion.div
          className="h-[640px] bg-cover bg-center p-10 rounded-2xl mt-10 flex flex-col justify-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          variants={fadeIn}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-5 mt-24 text-start"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {HeadingText.split(" ").map((wordText, i) => (
              <motion.span key={i} variants={word} className="inline-block mr-2">
                {wordText}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white mb-8 max-w-2xl font-thin"
            variants={fadeInUp}
          >
            Experience the future of fitness with our AI-powered platform. Track your progress,
            optimize your workouts, and achieve your goals faster than ever before.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Button label="Get Started" width="md:w-[150px] w-[120px]" onClick={() => navigate('/register')} />
            <Button label="Login" isSecondary={true} width="md:w-[120px] w-[100px]" onClick={() => navigate('login')} />
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <motion.div
          className="flex flex-col gap-4 p-10 items-center md:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2 className="text-xl md:text-4xl font-black w-3xs md:w-2xl text-black mb-2">
            Unlock Your Potential with Powered Features
          </motion.h2>

          <motion.p className="font-thin md:w-2xl text-black w-3xs">
            Our platform leverages cutting-edge AI technology to provide personalized fitness solutions
            tailored to your unique needs and goals.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: 'ChartLine', title: "AI-Powered Tracking", description: "Our AI algorithms accurately track your workouts, providing real-time feedback and insights to optimize your performance." },
              { icon: 'Activity', title: "Progress Monitoring", description: "Visualize your progress with detailed charts and reports, allowing you to stay motivated and make data-driven decisions." },
              { icon: 'Dumbbell', title: "Personalized Workout Plans", description: "Receive customized workout plans designed by AI, adapting to your fitness level, preferences, and goals for maximum effectiveness." },
              { icon: 'Beef', title: "Nutrition & Calorie Guidance", description: "Get personalized nutrition recommendations and calorie tracking to complement your workouts and support your overall fitness journey." },
            ].map((card, i) => (
              <motion.div key={i} custom={i} variants={cardVariants}>
                <LandingCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA SECTION */}
        <motion.div
          className="flex flex-col gap-5 p-10 items-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2 className="font-black text-4xl mb-2">Ready to Transform Your Fitness?</motion.h2>
          <motion.p className="font-thin text-center md:w-[600px]">
            Join us today and experience the future of fitness with AI-powered solutions tailored to your
            unique needs and goals.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Button label="Register Now" width="md:w-[180px] w-[140px]" onClick={() => navigate('/register')} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;