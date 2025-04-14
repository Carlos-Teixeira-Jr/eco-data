type InfoCard = {
  title: string;
  data: { label: string; value?: string }[];
};

/**
 * Um componente funcional que renderiza um card de informações exibindo um título
 * e uma lista de dados rotulados. Cada item de dados é composto por um rótulo e um valor opcional.
 * Se um valor não for fornecido, o rótulo é exibido com opacidade reduzida.
 * 
 * @param {Object} props - As propriedades para o componente.
 * @param {string} props.title - O título do card de informações.
 * @param {Array} props.data - Um array de objetos de dados a serem exibidos. Cada objeto
 * contém um rótulo e um valor opcional.
 * 
 * @returns {JSX.Element} Um componente de card estilizado com um título e uma lista de itens de dados.
 */

export function InfoCard({ title, data }: InfoCard) {
  return (
    <div className="flex-1 flex flex-col gap-5 border border-secondary-400 rounded-xl p-5">
      <h3 className="text-2xl font-semibold text-primary-100">{title}</h3>
      <hr className="border-secondary-400" />
      {data.map(({ value, label }) => (
        <div key={label}>
          <h2 className={`text-xl font-semibold text-neutral-300 ${!value && "opacity-30"}`}>
            {label}
          </h2>
          <h6>{value}</h6>
        </div>
      ))}
    </div>
  );
}
