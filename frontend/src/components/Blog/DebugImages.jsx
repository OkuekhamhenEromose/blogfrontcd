import { useState, useEffect } from 'react';

const DebugImages = () => {
  const [imageStatus, setImageStatus] = useState({});

  const testImage = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.status === 200 ? '✅ Accessible' : `❌ Status: ${response.status}`;
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  };

  const testAllImages = async () => {
    const testUrls = [
      'https://blogbackc.s3.eu-north-1.amazonaws.com/media/post_images/test_django_upload_O9xmTvc.jpg',
      'https://blogbackc.s3.eu-north-1.amazonaws.com/media/post_images/entertainmentfood_0hlt8Zx.webp',
      'https://blogbackc.s3.eu-north-1.amazonaws.com/media/post_images/anthonyjoshua.jpg',
      'https://blogbackc.s3.eu-north-1.amazonaws.com/media/post_images/thailandtravel_NsZGB7r.jpg'
    ];

    const results = {};
    for (const url of testUrls) {
      results[url] = await testImage(url);
    }
    setImageStatus(results);
  };

  useEffect(() => {
    testAllImages();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h3>🛠️ Image URL Debugger</h3>
      <button 
        onClick={testAllImages}
        style={{
          padding: '10px 15px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test All Images
      </button>
      <div style={{ marginTop: '20px' }}>
        {Object.entries(imageStatus).map(([url, status]) => (
          <div key={url} style={{ 
            margin: '10px 0', 
            padding: '15px', 
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <div><strong>URL:</strong> {url}</div>
            <div><strong>Status:</strong> 
              <span style={{ 
                color: status.includes('✅') ? 'green' : 'red',
                marginLeft: '10px'
              }}>
                {status}
              </span>
            </div>
            {status === '✅ Accessible' && (
              <div>
                <img 
                  src={url} 
                  alt="Test" 
                  style={{ 
                    maxWidth: '200px', 
                    marginTop: '10px',
                    border: '2px solid green'
                  }} 
                />
                <div style={{ fontSize: '12px', color: 'green', marginTop: '5px' }}>
                  ✓ Image loaded successfully
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugImages;