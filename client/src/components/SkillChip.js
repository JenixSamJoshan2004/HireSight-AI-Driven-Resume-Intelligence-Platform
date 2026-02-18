const SkillChip = ({ skill, type }) => {
  const color =
    type === "matched"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${color}`}>{skill}</span>
  );
};

export default SkillChip;
//✔ Green = matched
//✔ Red = missing