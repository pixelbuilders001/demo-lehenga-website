import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, CreditCard, LogOut, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/store/authStore";

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-luxury text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">My Account</h1>
            <p className="text-muted-foreground mb-8">Sign in to access your account</p>
            <Link to="/login" className="btn-luxury">Sign In</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const menuItems = [
    { icon: User, label: "My Profile", path: "/account/profile" },
    { icon: Package, label: "My Orders", path: "/account/orders" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
    { icon: MapPin, label: "Saved Addresses", path: "/account/addresses" },
    { icon: CreditCard, label: "Payment Methods", path: "/account/payments" },
  ];

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-serif font-bold mb-4">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h1 className="font-serif text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="bg-secondary rounded-lg overflow-hidden">
                {menuItems.map((item, index) => (
                  <Link key={item.path} to={item.path} className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border last:border-0">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                ))}
                <button onClick={logout} className="w-full flex items-center gap-4 p-4 text-destructive hover:bg-muted transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Account;
