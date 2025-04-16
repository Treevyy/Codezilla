const CodezillaArena = () => {
  const playTestSound = () => {
    const sound = new Audio('/80s-loop-5.wav'); // ✅ Make sure this file is in /public
    sound.play();
  };

  return (
    <div
      style={{
        backgroundImage: `url('/Codezilla_bg.jpg')`, // ✅ Make sure this matches your actual file name
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        paddingTop: '4rem',
      }}
    >
      <button
  onClick={playTestSound}
  style={{
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#8b0000',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }}
>
  Test Music
</button>


    </div>
  );
};

export default CodezillaArena;
