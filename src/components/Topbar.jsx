
const Topbar = ({ title }) => {
    return (
      <header className="h-16 bg-white border-b shadow px-6 flex items-center justify-between sticky top-0 left-64 z-10">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        {/* You can add user info here later */}
      </header>
    );
  };
  
  export default Topbar;
  