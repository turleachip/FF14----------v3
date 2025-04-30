export function createDataOperations(container) {
  const template = `
    <div class="bg-gray-800 p-4 rounded">
      <!-- データ取得セクション -->
      <div class="mb-6 pb-6 border-b border-gray-600">
        <h2 class="text-xl mb-4 text-white">fetch test data</h2>
        <button 
          id="fetchButton"
          class="bg-gray-700 text-white px-4 py-2 rounded"
        >
          fetch test data list
        </button>
        <div id="itemsList" class="mt-4 overflow-x-auto"></div>
      </div>
      
      <!-- データ追加セクション -->
      <div>
        <h2 class="text-xl mb-4 text-white">add test data</h2>
        <form id="addItemForm" class="space-y-4">
          <div>
            <label for="testValue" class="block mb-2 text-white">input value</label>
            <input type="text" id="testValue" class="w-full p-2 bg-gray-700 text-white rounded" required>
          </div>
          <button 
            type="submit"
            class="bg-gray-700 text-white px-4 py-2 rounded"
          >
            add
          </button>
        </form>
        <div id="addResult" class="mt-4"></div>
      </div>
    </div>
  `;

  container.innerHTML = template;

  const fetchButton = container.querySelector('#fetchButton');
  const itemsList = container.querySelector('#itemsList');
  const addItemForm = container.querySelector('#addItemForm');
  const addResult = container.querySelector('#addResult');

  // データ取得
  fetchButton.addEventListener('click', async () => {
    try {
      const res = await fetch('http://localhost:8000/api-tests');
      const items = await res.json();
      
      if (items.length === 0) {
        itemsList.innerHTML = '<p class="text-white">データがありません</p>';
        return;
      }
      
      // シンプルなテーブル
      const tableHtml = `
        <div class="overflow-x-auto">
          <table class="w-full text-white">
            <thead>
              <tr class="bg-gray-700">
                <th class="p-2 text-left">ID</th>
                <th class="p-2 text-left">テスト値</th>
                <th class="p-2 text-left">作成日時</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item, index) => `
                <tr class="bg-gray-700">
                  <td class="p-2">${item.id}</td>
                  <td class="p-2">${item.test_value || '未設定'}</td>
                  <td class="p-2">${new Date(item.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      
      itemsList.innerHTML = tableHtml;
    } catch (err) {
      itemsList.innerHTML = `
        <div class="bg-gray-700 p-4 rounded">
          <p class="text-white">データ取得に失敗しました: ${err.message}</p>
        </div>
      `;
    }
  });

  // データ追加
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const testValueInput = container.querySelector('#testValue');
    
    const newItem = {
      test_value: testValueInput.value
    };
    
    try {
      const res = await fetch('http://localhost:8000/api-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'サーバーエラーが発生しました');
      }
      
      const data = await res.json();
      
      addResult.innerHTML = `
        <div class="bg-gray-700 p-4 rounded mt-4">
          <p class="text-white">テストデータを追加しました: ID ${data.id}</p>
        </div>
      `;
      
      // フォームをリセット
      testValueInput.value = '';
      
      // 一覧を更新
      fetchButton.click();
    } catch (err) {
      addResult.innerHTML = `
        <div class="bg-gray-700 p-4 rounded mt-4">
          <p class="text-white">データ追加に失敗しました: ${err.message}</p>
        </div>
      `;
    }
  });
} 