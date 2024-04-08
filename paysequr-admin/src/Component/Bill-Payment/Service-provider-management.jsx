import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Grid, FormControl, InputLabel, Select, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

const ServiceProviderPage = () => {
  // Dummy data for service providers
  const [serviceProviders, setServiceProviders] = useState([
    { id: 1, name: 'Provider 1', category: 'Category 1', managerUsername: 'manager1', plans: [{ name: 'Plan 1', amount: 100 }] },
    { id: 2, name: 'Provider 2', category: 'Category 2', managerUsername: 'manager2', plans: [{ name: 'Plan 2', amount: 200 }] },
    { id: 3, name: 'Provider 3', category: 'Category 1', managerUsername: 'manager3', plans: [{ name: 'Plan 3', amount: 300 }] },
  ]);

  // State for new service provider input and editing
  const [newProvider, setNewProvider] = useState({
    name: '',
    category: '',
    managerUsername: '',
    plans: [],
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchedProviders, setSearchedProviders] = useState([]);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    const filteredProviders = serviceProviders.filter(provider =>
      provider.category === selectedCategory
    );
    setSearchedProviders(filteredProviders);
  };

  const [openDialog, setOpenDialog] = useState(false);

  // Function to add a new service provider
 const addProvider = () => {
  setServiceProviders([...serviceProviders, { ...newProvider, id: serviceProviders.length + 1 }]);
  setNewProvider({ name: '', category: '', managerUsername: '', plans: [] });
  setOpenDialog(false); // Close the dialog after adding the provider
};

  // Function to delete a service provider
 // Function to delete a service provider
const deleteProvider = (providerId) => {
  const updatedProviders = serviceProviders.filter(provider => provider.id !== providerId);
  
  // Update the IDs of the remaining providers
  const updatedProvidersWithIds = updatedProviders.map((provider, index) => ({
    ...provider,
    id: index + 1,
  }));
  
  setServiceProviders(updatedProvidersWithIds);
};

  // Columns configuration for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Provider Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'managerUsername', headerName: 'Manager Username', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => setOpenDialog(true)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteProvider(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const handlePlanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlans = [...newProvider.plans];
    updatedPlans[index][name] = value;
    setNewProvider({ ...newProvider, plans: updatedPlans });
  };

  const handleAddPlan = () => {
    const updatedPlans = [...newProvider.plans, { name: '', amount: '' }];
    setNewProvider({ ...newProvider, plans: updatedPlans });
  };

  const handleRemovePlan = (index) => {
    const updatedPlans = [...newProvider.plans];
    updatedPlans.splice(index, 1);
    setNewProvider({ ...newProvider, plans: updatedPlans });
  };

  return (
    <Container>
            <Typography variant="h4" className='text-gray-700'  style={{marginTop:'20px'}} gutterBottom>Service Providers</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select Category"
            value={selectedCategory}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            // style={{marginTop:'5px'}}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            {/* Add more categories as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" startIcon={<Search />} onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid>
      <Paper elevation={3} style={{ height: 400, width: '100%', marginBottom: '2rem', marginTop: '1rem' }}>
        <DataGrid
          rows={searchedProviders.length > 0 ? searchedProviders : serviceProviders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setOpenDialog(true)}
        style={{ marginBottom: '1rem' }}
      >
        Add Provider
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Provider</DialogTitle>
        <DialogContent>
          <TextField
            label="Provider Name"
            value={newProvider.name}
            onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            select
            label="Select Category"
            value={newProvider.category}
            onChange={(e) => setNewProvider({ ...newProvider, category: e.target.value })}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          >
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            {/* Add more categories as needed */}
          </TextField>
          <TextField
            label="Provider Manager Username"
            value={newProvider.managerUsername}
            onChange={(e) => setNewProvider({ ...newProvider, managerUsername: e.target.value })}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <Typography variant="h6" gutterBottom>Provider Plans</Typography>
          {newProvider.plans.map((plan, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  label={`Plan Name ${index + 1}`}
                  name="name"
                  value={plan.name}
                  onChange={(e) => handlePlanChange(index, e)}
                  variant="outlined"
                  fullWidth
                 style={{marginBottom:'20px'}}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label={`Plan Amount ${index + 1}`}
                  name="amount"
                  value={plan.amount}
                  onChange={(e) => handlePlanChange(index, e)}
                  variant="outlined"
                  fullWidth
                  style={{marginBottom:'20px'}}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemovePlan(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={handleAddPlan} style={{ marginTop: '1rem' }}>Add Plan</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={addProvider} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceProviderPage;
