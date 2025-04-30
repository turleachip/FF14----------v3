import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">Hello Vite + Tailwind!</h1>
      <p class="text-gray-600">TailwindCSSが正しく動作しています！</p>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        クリック
      </button>
    </div>
  </div>
` 