import "react-native-gesture-handler";
import Route from "./screens";
import { AuthProvider } from "./contexts";
import { DataProvider } from "./contexts/DataContext";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Route />
      </DataProvider>
    </AuthProvider>
  );
}
