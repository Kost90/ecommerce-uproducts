// export const errorHandler = e => dispatch => {
//     if (e.code === 'ERR_CANCELED' || e.response?.status === 401) return;
  
//     if (e?.response?.status === 500 || e?.response?.status === 502 || e?.response?.status === 504) {
//       dispatch(
//         openCustomModal({
//           content: (
//             <ErrorHandlerAlert title="Unknown error" message="Oops! Something went wrong. Please try again later" />
//           ),
//           maxWidth: '700px',
//         }),
//       );
//     } else {
//       dispatch(
//         showSnackbar(`${e?.response?.data?.data?.errors[0]?.message}`, {
//           variant: 'error',
//         }),
//       );
//       console.error('error: ', e?.message);
//     }
//   };