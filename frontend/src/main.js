import './style.css'
import { createTestApi } from './components/TestApi.js'
import { createDataOperations } from './components/DataOperations.js'
import 'flowbite';

// ダークモードを有効にする
document.documentElement.classList.add('dark');

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="min-h-screen bg-gray-900">
    <!-- シンプルなナビゲーションバー -->
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex justify-between">
          <h1 class="text-xl font-bold text-white">Predictor</h1>
          <div>
            <ul class="flex space-x-4">
              <li><a href="#" class="text-white hover:text-blue-300">this is global menu!</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- メインコンテンツ -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- APIテストセクション -->
      <div class="mb-8" id="testApi"></div>
      
      <!-- データ操作セクション -->
      <div id="dataOperations"></div>
    </div>
  </div>
`;

createTestApi(document.querySelector('#testApi'));
createDataOperations(document.querySelector('#dataOperations')); 