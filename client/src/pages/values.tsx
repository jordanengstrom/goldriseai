import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Shield, Users, Lightbulb, Target } from "lucide-react";

const values = [
  {
    title: "Courage",
    description: "We are not afraid to challenge the status quo. We take bold steps to innovate and drive meaningful change, even when the path is uncertain or difficult.",
    icon: Shield,
  },
  {
    title: "Collaboration",
    description: "We believe that the best solutions are built together. Our success relies on open communication, mutual respect, and seamless teamwork across all disciplines.",
    icon: Users,
  },
  {
    title: "Creativity",
    description: "Imagination is at the core of what we do. We continuously explore new ideas, blending art and technology to craft uniquely effective solutions.",
    icon: Lightbulb,
  },
  {
    title: "Commitment",
    description: "We are deeply dedicated to our mission and to the success of our clients. We deliver on our promises and hold ourselves accountable to the highest standards.",
    icon: Target,
  }
];

export default function Values() {
  return (
    <Layout>
      <section className="relative py-24 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient"
            >
              Our <span className="text-primary">Values</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              The foundational principles that guide our work, define our culture, and drive our vision forward.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="glass-panel p-8 rounded-2xl border-foreground/5 hover:border-primary/30 transition-all duration-500 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 text-foreground lowercase tracking-wide group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
