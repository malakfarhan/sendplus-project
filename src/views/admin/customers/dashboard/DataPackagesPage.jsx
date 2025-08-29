import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Switch,
  AppBar,
  Toolbar,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Slide,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import MUIDataTable from "mui-datatables";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SimCardIcon from '@mui/icons-material/SimCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const networks = ['zong', 'telenor', 'ufone', 'jazz'];

const packages = [
  // Zong Packages
  {
    id: 1,
    name: 'Super Weekly Plus on Internet Sim',
    provider: 'zong',
    price: 350,
    details: '8GB, Validity: 7 Days',
  },
  {
    id: 2,
    name: 'Super Weekly Max on Internet SIM',
    provider: 'zong',
    price: 450,
    details: '25GB, Validity: 7 Days',
  },
  {
    id: 3,
    name: '20GB Monthly Internet Sim',
    provider: 'zong',
    price: 575,
    details: '20GB (10GB 1am-9am), Validity: 30 Days',
  },
  {
    id: 4,
    name: 'Monthly 40GB Internet Sim',
    provider: 'zong',
    price: 940,
    details: '40GB (20GB 1am-9am), Validity: 30 Days',
  },
  {
    id: 5,
    name: 'Internet SIM 65GB',
    provider: 'zong',
    price: 2100,
    details: '65GB, Validity: 30 Days',
  },
  {
    id: 6,
    name: 'Internet SIM 175GB (Inc. 100GB 1am-9am)',
    provider: 'zong',
    price: 3300,
    details: '175GB (75GB Flat + 100GB 1am-9am), Validity: 30 Days',
  },
  // Ufone Packages
  {
    id: 7,
    name: 'Ufone Power Pack',
    provider: 'ufone',
    price: 699,
    details: '5GB, Validity: 10 Days',
  },
  {
    id: 8,
    name: 'Ufone Weekly Internet Max',
    provider: 'ufone',
    price: 250,
    details: '16GB (8GB + 8GB 1am-9am), Validity: 7 Days',
  },
  {
    id: 9,
    name: 'Ufone Monthly Light',
    provider: 'ufone',
    price: 390,
    details: '2GB + 2GB Social, Validity: 30 Days',
  },
  {
    id: 10,
    name: 'Ufone Monthly Heavy',
    provider: 'ufone',
    price: 750,
    details: '10GB, Validity: 30 Days',
  },
  {
    id: 11,
    name: 'Ufone Super Internet',
    provider: 'ufone',
    price: 130,
    details: '1.5GB, Validity: 7 Days',
  },
  // Telenor Packages
  {
    id: 12,
    name: 'Telenor Smart Bundle',
    provider: 'telenor',
    price: 799,
    details: '8GB, Validity: 15 Days',
  },
  {
    id: 13,
    name: 'Telenor 4G Weekly Ultra',
    provider: 'telenor',
    price: 250,
    details: '8GB (incl. 1GB 1am-11am), Validity: 7 Days',
  },
  {
    id: 14,
    name: 'Telenor Monthly Lite',
    provider: 'telenor',
    price: 330,
    details: '4GB, Validity: 30 Days',
  },
  {
    id: 15,
    name: 'Telenor Monthly Heavy',
    provider: 'telenor',
    price: 600,
    details: '12GB, Validity: 30 Days',
  },
  {
    id: 16,
    name: 'Telenor 4G Monthly Ultra',
    provider: 'telenor',
    price: 900,
    details: '20GB (10GB 1am-11am), Validity: 30 Days',
  },
  // Jazz Packages
  {
    id: 17,
    name: 'Jazz Super 4G',
    provider: 'jazz',
    price: 899,
    details: '10GB, Validity: 20 Days',
  },
  {
    id: 18,
    name: 'Jazz Weekly Mega',
    provider: 'jazz',
    price: 350,
    details: '7GB, Validity: 7 Days',
  },
  {
    id: 19,
    name: 'Jazz Monthly Supreme',
    provider: 'jazz',
    price: 885,
    details: '20GB, Validity: 30 Days',
  },
  {
    id: 20,
    name: 'Jazz Monthly Mega',
    provider: 'jazz',
    price: 575,
    details: '12GB, Validity: 30 Days',
  },
  {
    id: 21,
    name: 'Jazz Weekly Extreme',
    provider: 'jazz',
    price: 120,
    details: '2.5GB (12am-9am), Validity: 7 Days',
  },
];

const getNetworkIcon = (network) => {
  const icons = {
    zong: '🟢',
    telenor: '🔵',
    ufone: '🟠',
    jazz: '🔴',
  };
  return icons[network] || '📶';
};

const networkDetails = {
  zong: {
    name: 'Zong',
    color: '#8EC73F',
    icon: <SimCardIcon sx={{ color: '#8EC73F', fontSize: 32, mr: 1 }} />,
    about: 'Zong is known for its fast 4G internet and wide coverage across Pakistan.'
  },
  telenor: {
    name: 'Telenor',
    color: '#0070BA',
    icon: <SimCardIcon sx={{ color: '#0070BA', fontSize: 32, mr: 1 }} />,
    about: 'Telenor offers reliable connectivity and affordable data bundles.'
  },
  ufone: {
    name: 'Ufone',
    color: '#FF9100',
    icon: <SimCardIcon sx={{ color: '#FF9100', fontSize: 32, mr: 1 }} />,
    about: 'Ufone provides value-for-money internet packages and good urban coverage.'
  },
  jazz: {
    name: 'Jazz',
    color: '#E60000',
    icon: <SimCardIcon sx={{ color: '#E60000', fontSize: 32, mr: 1 }} />,
    about: 'Jazz is Pakistan’s largest network with high-speed 4G and extensive reach.'
  },
};

const DataPackagesPage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('zong');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleBuyNow = (pkg) => {
    setSelectedPackage(pkg);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedPackage(null);
  };

  // Filter packages by selected network
  const filteredPackages = packages.filter(pkg => pkg.provider === selectedNetwork);

  // Network brand colors
  const brandColor = networkDetails[selectedNetwork].color;
  const brandIcon = networkDetails[selectedNetwork].icon;
  const brandAbout = networkDetails[selectedNetwork].about;

  // Move columns definition here so filteredPackages is in scope
  const columns = [
    {
      name: "name",
      label: "Package",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "price",
      label: "Price (Rs.)",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => `Rs. ${value}`,
      }
    },
    {
      name: "details",
      label: "Details",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "subscribe",
      label: "Subscribe",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const [phone, setPhone] = React.useState("");
          // Get the package name for alert
          const pkg = filteredPackages[dataIndex];
          const handleSubscribe = () => {
            setSnackbarMsg(`Subscribed to ${pkg.name} with number: ${phone}`);
            setSnackbarOpen(true);
          };
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                size="small"
                placeholder="03XXXXXXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                sx={{ width: 130 }}
              />
              <Button 
                variant="contained" 
                size="small"
                onClick={handleSubscribe}
                startIcon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
                sx={{
                  backgroundColor: brandColor,
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 2,
                  textTransform: 'uppercase',
                  boxShadow: `0 2px 6px 0 ${brandColor}33`,
                  '&:hover': { backgroundColor: brandColor },
                  minWidth: 120
                }}
              >
                SUBSCRIBE
              </Button>
            </Box>
          );
        }
      }
    },
  ];

  // Filter and sort packages
  // let filteredPackages = packages.filter(
  //   (pkg) =>
  //     pkg.provider === selectedNetwork &&
  //     pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // if (sortOrder === 'lowToHigh') {
  //   filteredPackages.sort((a, b) => a.price - b.price);
  // } else {
  //   filteredPackages.sort((a, b) => b.price - a.price);
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" enableColorOnDark sx={{ boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            📡 Data Packages
          </Typography>
          <Box display="flex" alignItems="center">
            <DarkMode sx={{ mr: 1 }} />
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
            <LightMode sx={{ ml: 1 }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Fade in timeout={700}>
        <Box
          sx={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${brandColor}11 0%, #f9f9f9 100%)`,
            pb: 8,
          }}
        >
          <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, px: 3 }}>
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              Internet Sim Data Bundles
            </Typography>
            {/* Network Selector Section */}
            <Box sx={{
              background: darkMode ? 'rgba(30,40,60,0.7)' : 'rgba(255,255,255,0.8)',
              borderRadius: 3,
              boxShadow: 1,
              p: 2,
              mb: 2,
            }}>
              <Stack direction="row" justifyContent="center" flexWrap="wrap" spacing={2} mb={2}>
                {Object.keys(networkDetails).map((net) => {
                  const isSelected = selectedNetwork === net;
                  return (
                    <Box
                      key={net}
                      onClick={() => setSelectedNetwork(net)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 3,
                        py: 1.5,
                        minWidth: 120,
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '15px',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        color: isSelected ? networkDetails[net].color : '#777',
                        border: isSelected ? `2px solid ${networkDetails[net].color}` : '1px solid #ccc',
                        backgroundColor: isSelected ? `${networkDetails[net].color}18` : '#fff',
                        boxShadow: isSelected ? 2 : 0,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: `${networkDetails[net].color}22`,
                        },
                        '&::after': isSelected
                          ? {
                              content: '""',
                              position: 'absolute',
                              height: '3px',
                              width: '60%',
                              backgroundColor: networkDetails[net].color,
                              bottom: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              borderRadius: '2px',
                            }
                          : {},
                      }}
                    >
                      {networkDetails[net].icon}
                      {networkDetails[net].name}
                    </Box>
                  );
                })}
              </Stack>
              {/* About this network */}
              <Box sx={{
                background: brandColor + '10',
                borderLeft: `5px solid ${brandColor}`,
                borderRadius: 2,
                p: 2,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
                {brandIcon}
                <Typography variant="subtitle2" sx={{ color: brandColor, fontWeight: 600 }}>
                  About {networkDetails[selectedNetwork].name}:
                </Typography>
                <Typography variant="body2" sx={{ color: '#444', ml: 1 }}>
                  {brandAbout}
                </Typography>
              </Box>
                      </Box>
            {/* Data Table Section */}
            <MUIDataTable
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {brandIcon}
                  <Typography variant="h6" sx={{ color: brandColor, fontWeight: 'bold', background: brandColor + '18', px: 1, borderRadius: 1, textShadow: `0 2px 8px ${brandColor}33` }}>
                    {networkDetails[selectedNetwork].name} Internet Sim Data Bundles
                        </Typography>
                </Box>
              }
              data={filteredPackages}
              columns={columns}
              options={{
                filterType: 'checkbox',
                selectableRows: 'none',
                responsive: 'standard',
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 20],
                elevation: 0,
                setTableProps: () => ({
                  style: {
                    background: brandColor + '07',
                    borderRadius: 12,
                    boxShadow: `0 4px 24px 0 ${brandColor}22`,
                  },
                }),
                setTableHeadCellProps: () => ({
                  style: {
                    background: brandColor + '18',
                    color: brandColor,
                    fontWeight: 'bold',
                    fontSize: 16,
                  },
                }),
                setRowProps: () => ({
                  style: {
                    transition: 'background 0.2s',
                  },
                  onMouseOver: (e) => {
                    e.currentTarget.style.background = brandColor + '18';
                  },
                  onMouseOut: (e) => {
                    e.currentTarget.style.background = brandColor + '07';
                  },
                }),
              }}
            />
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', background: brandColor, color: '#fff', fontWeight: 600 }}>
                {snackbarMsg}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Box>
      </Fade>

      {/* Buy Now Modal */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        {selectedPackage && (
          <DialogContent>
            <Typography variant="subtitle1">
              You're about to buy <strong>{selectedPackage.name}</strong>
            </Typography>
            <Typography variant="body2" mt={1}>
              Price: Rs. {selectedPackage.price}
            </Typography>
            <Typography variant="body2">
              Data: {selectedPackage.dataVolume}
            </Typography>
            <Typography variant="body2">
              Validity: {selectedPackage.validity}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleDialogClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DataPackagesPage;