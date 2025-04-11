import PaperIcon from "@/app/assets/icons/PaperIcon";
import SearchIcon from "@/app/assets/icons/SearchIcon";
import ShareIcon from "@/app/assets/icons/ShareIcon";
import StudyIcon from "@/app/assets/icons/StudyIcon";

const InfoSection = () => {
  const fill = "#9dbf21";

  const sections = [
    {
      icon: (
        <SearchIcon className="w-8.5 h-8.5" fill={fill}
        />
      ),
      title: "Encontre o que você precisa",
    },
    {
      icon: (
        <PaperIcon className="w-8.5 h-8.5" fill={fill} />
      ),
      title: "Veja informações taxonômicas ou projetos",
    },
    {
      icon: (
        <StudyIcon className="w-8.5 h-8.5" fill={fill} />
      ),
      title: "Use os dados para seus estudos ou projetos",
    },
    {
      icon: (
        <ShareIcon className="w-8.5 h-8.5" fill={fill} />
      ),
      title: "Compartilhe e contribua com conhecimento",
    },
  ];

  return (
    <section className="p-5 md:p-20 m-5 md:m-20 border-2 border-primary-500 rounded-2xl flex flex-col md:flex-row justify-between items-center md:gap-2 gap-10">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col items-center max-w-40 gap-5">
          <div className="border-2 border-secondary-400 rounded-full p-2 md:p-5 flex justify-center items-center">{section.icon}</div>
          <h6 className="text-center text-primary-100">{section.title}</h6>
        </div>
      ))}
    </section>
  );
};

export default InfoSection;
