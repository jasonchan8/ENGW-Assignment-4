export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Hypertrophy Helper</h1>
        <p className="text-lg md:text-xl text-blue-100">
          Evidence-based training volume recommendations for muscle growth
        </p>
      </div>
    </header>
  );
}

