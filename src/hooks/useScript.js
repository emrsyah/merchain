import { useEffect } from 'react';

const useScript = (url, key) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.setAttribute('data-client-key', key);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url, key]);
};

export default useScript;