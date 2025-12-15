import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await signup(formData);
    setIsLoading(false);
    if (success) {
      toast({ title: "Account created!", description: "Welcome to VANYA." });
      navigate("/account");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join the VANYA family</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary pr-12" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="btn-luxury w-full">{isLoading ? "Creating account..." : "Create Account"}</button>
            </form>
            <p className="text-center mt-6 text-muted-foreground">
              Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
