import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const SwipeCard = ({ students, onSwipe, onEdit }) => {
  const [index, setIndex] = useState(0);

  const swiped = (dir, id) => {
    if (dir === "left") onSwipe(id, "Absent");
    else if (dir === "right") onSwipe(id, "Present");

    setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 300);
  };

  if (index >= students.length) return <p className="text-lg">All students marked!</p>;

  const student = students[index];

  return (
    <div className="relative w-80 h-96">
      <TinderCard
        key={student.id}
        onSwipe={(dir) => swiped(dir, student.id)}
        preventSwipe={["up", "down"]}
      >
        <motion.div
          className="w-80 h-96 bg-white rounded-xl shadow-lg p-6 text-center relative"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-bold mb-4">{student.name}</h2>
          <p className="text-sm mb-4">Roll: {student.roll}</p>
          <p className="text-xs">Swipe right for ✅ | Swipe left for ❌</p>
          <button
            className="absolute top-3 right-3 text-indigo-600"
            onClick={() => onEdit(student)}
          >
            <FaEdit />
          </button>
        </motion.div>
      </TinderCard>
    </div>
  );
};

export default SwipeCard;
