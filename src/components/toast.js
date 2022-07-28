import toast from 'react-hot-toast';

export const ToastPromise = (myPromise,loadingText,successText,transaction_hash) => {
    toast.promise(
        myPromise,
        {
          loading: loadingText,
          success: (data) => `${successText} ${transaction_hash}`,
          error: (err) => `This just happened: ${err.toString()}`,
        },
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 10000,
            
          },
        }
      );
}