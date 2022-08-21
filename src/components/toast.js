import toast from 'react-hot-toast';

export const ToastPromise = (myPromise,loadingText,successText) => {
    toast.promise(
        myPromise,
        {
          loading: loadingText,
          success: (data) => function(){
            console.log("data",data)
            return successText
          },
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