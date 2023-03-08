// import * as React from 'react';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Switch from '@mui/material/Switch';
// import Modal from '@mui/material/Modal';
// // import ModalDialog from '@mui/material/ModalDialog';
// // import ModalClose from '@mui/material/ModalClose';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';

// export default function DialogVerticalScroll() {
//   const [open, setOpen] = React.useState('');
//   const [scroll, setScroll] = React.useState(true);
//   return (
//     <React.Fragment>
//       <Stack direction="row" spacing={1}>
//         <Button variant="outlined" color="neutral" onClick={() => setOpen('center')}>
//           Center
//         </Button>
//       </Stack>
//       <Modal open={!!open} onClose={() => setOpen('')}>
//         <ModalDialog
//           aria-labelledby="dialog-vertical-scroll-title"
//           aria-describedby="dialog-vertical-scroll-description"
//           layout={open || undefined}
//         >
//           <ModalClose />
//           <Typography id="dialog-vertical-scroll-title" component="h2">
//             Vertical scroll example
//           </Typography>
//           <FormControl
//             orientation="horizontal"
//             sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
//           >
//             <FormLabel>Container overflow</FormLabel>
//             <Switch
//               checked={scroll}
//               onChange={(event) => setScroll(event.target.checked)}
//               sx={{ ml: 'auto' }}
//             />
//           </FormControl>
//           <List
//             sx={{
//               overflow: scroll ? 'scroll' : 'initial',
//               mx: 'calc(-1 * var(--ModalDialog-padding))',
//               px: 'var(--ModalDialog-padding)',
//             }}
//           >
//             {[...Array(100)].map((item, index) => (
//               <ListItem key={index}>I&apos;m in a scrollable area.</ListItem>
//             ))}
//           </List>
//         </ModalDialog>
//       </Modal>
//     </React.Fragment>
//   );
// }
