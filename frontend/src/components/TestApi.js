// TestApi.js
export function createTestApi(container) {
  const template = `
    <div class="bg-gray-800 p-4 rounded">
      <h2 class="text-xl mb-4 text-white">API access test</h2>
      
      <button 
        id="testButton"
        class="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Test connection execution
      </button>

      <div id="responseContainer" class="mt-4 hidden"></div>
    </div>
  `;

  container.innerHTML = template;

  const button = container.querySelector('#testButton');
  const responseContainer = container.querySelector('#responseContainer');

  button.addEventListener('click', async () => {
    try {
      const res = await fetch('http://localhost:8000/test');
      const data = await res.json();
      
      responseContainer.innerHTML = `
        <div class="bg-gray-700 p-4 rounded">
          <p class="text-white">レスポンス: ${data.message}</p>
        </div>
      `;
      responseContainer.classList.remove('hidden');
    } catch (err) {
      responseContainer.innerHTML = `
        <div class="bg-gray-700 p-4 rounded">
          <p class="text-white">APIとの通信に失敗しました</p>
        </div>
      `;
      responseContainer.classList.remove('hidden');
    }
  });
} 