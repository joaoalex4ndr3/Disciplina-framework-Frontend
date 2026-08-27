import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import { Icon } from "../components/Common/Icon";
import { PLANS } from "../utils/constants";

/**
 * PRICINGPAGE COMPONENT
 */
export const PricingPage = ({ user, onUpgrade }) => {
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async () => {
    // Simulate upgrade
    await new Promise((r) => setTimeout(r, 1500));
    onUpgrade();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="p-8 max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="font-head font-black text-5xl mb-4">
          Simple{" "}
          <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>
        <p className="text-text2 text-lg">
          Start free, upgrade when you're ready
        </p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-lg bg-green/10 border border-green/30 flex items-center gap-3 text-green"
        >
          <Icon.Check className="w-5 h-5" />
          <span>Successfully upgraded to Pro! Enjoy unlimited access 🎉</span>
        </motion.div>
      )}

      {/* Plans */}
      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
      >
        {PLANS.map((plan, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={plan.featured ? { y: -8 } : {}}
            className={`
              relative p-8 rounded-2xl border overflow-hidden
              ${
                plan.featured
                  ? "bg-gradient-to-br from-accent/20 to-transparent border-accent/50"
                  : "bg-surface border-border"
              }
            `}
          >
            {/* Badge */}
            {plan.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-accent to-cyan text-white uppercase"
              >
                Most Popular
              </motion.div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  plan.featured
                    ? "bg-gradient-to-br from-accent to-cyan"
                    : "bg-surface2"
                }`}
              >
                {plan.featured ? (
                  <Icon.Crown className="w-5 h-5 text-white" />
                ) : (
                  <Icon.Star className="w-5 h-5 text-text2" />
                )}
              </div>
              <div>
                <h3 className="font-head font-bold text-xl">{plan.name}</h3>
                <p className="text-text2 text-sm">{plan.desc}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-head font-black text-5xl">
                  {plan.price}
                </span>
                <span className="text-text2">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + j * 0.05 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.featured ? "bg-accent/20" : "bg-surface2"
                    }`}
                  >
                    <Icon.Check
                      className={`w-3 h-3 ${
                        plan.featured ? "text-accent" : "text-text2"
                      }`}
                    />
                  </div>
                  <span>{f}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button
              variant={plan.featured ? "primary" : "ghost"}
              size="lg"
              onClick={
                plan.featured && user.plan !== "pro" ? handleUpgrade : undefined
              }
              disabled={user.plan === plan.name.toLowerCase()}
              className="w-full"
            >
              {user.plan === plan.name.toLowerCase()
                ? "Current Plan ✓"
                : plan.featured
                  ? "Upgrade to Pro"
                  : "Current Plan"}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center text-text3 text-sm">
        Powered by Razorpay · Secure payment · Cancel anytime
      </p>
    </motion.div>
  );
};

export default PricingPage;
