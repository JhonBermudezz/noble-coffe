import { motion } from "motion/react";
import { food } from "../../data/menu";
import { Photo } from "../Photo";
import { useSelect } from "./selection";

const ease = [0.16, 1, 0.3, 1] as const;

export function FoodGrid() {
  const select = useSelect();

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {food.map((item, i) => {
          const id = `food-${item.name}`;
          return (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease }}
            >
              <motion.button
                layoutId={`row-${id}`}
                onClick={() => select({ id, name: item.name, note: item.note, photo: item.image, gold: !item.image })}
                aria-label={`${item.name}, ver detalle`}
                className="group block w-full bg-paper text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden">
                  {item.image ? (
                    <Photo
                      name={item.image}
                      alt=""
                      sizes="(min-width: 768px) 30vw, 45vw"
                      className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                    />
                  ) : (
                    <span className="grid h-full place-items-center bg-gold text-on-gold">
                      <span className="rounded-[50%] border border-on-gold/70 px-4 py-2 text-center font-condensed text-[clamp(1.6rem,3vw,2.6rem)] uppercase leading-none transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                        {item.name}
                      </span>
                    </span>
                  )}
                </span>
                <motion.span layoutId={`name-${id}`} className="mt-3 block font-semibold tracking-tight md:text-lg">
                  {item.name}
                </motion.span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
