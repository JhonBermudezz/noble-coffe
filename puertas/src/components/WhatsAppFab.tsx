import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { WA } from "../data";

export function WhatsAppFab() {
  return (
    <motion.a
      href={WA()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2.4, type: "spring", stiffness: 260, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 grid h-[60px] w-[60px] place-items-center rounded-full bg-wa text-white shadow-[0_12px_30px_-6px_rgb(37_211_102/0.6)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-wa/40" />
      <MessageCircle size={28} className="relative" />
    </motion.a>
  );
}
