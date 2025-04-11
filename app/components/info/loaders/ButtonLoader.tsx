export interface IButtonLoader {
  btnIsDark: boolean,
  className?: string
}

/**
 * Um botão com uma animação de bolinhas que pulam. As cores do botão mdam de acordo
 * com a prop "btnIsDark".
 *
 * @param {IButtonLoader} {btnIsDark} - Se for true, o botão fica escuro.
 *
 * @returns {JSX.Element} Um botão com animação de bolinhas pulando.
 */
const ButtonLoader = ({btnIsDark, className = ""}: IButtonLoader) => {
  return (
    <button className={`${className} ${btnIsDark ? 'btn-loader-dark' : 'btn-loader-light'}`}>
      <span className={`${btnIsDark ? 'dark-bouncing-dots' : 'light-bouncing-dots'} [animation-delay:0ms]`}>.</span>
      <span className={`${btnIsDark ? 'dark-bouncing-dots' : 'light-bouncing-dots'} [animation-delay:100ms]`}>.</span>
      <span className={`${btnIsDark ? 'dark-bouncing-dots' : 'light-bouncing-dots'} [animation-delay:200ms]`}>.</span>
    </button>
  );
};

export default ButtonLoader;