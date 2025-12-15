import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      toast({ title: "Welcome back!", description: "You have been logged in successfully." });
      navigate("/account");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your VANYA account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary pr-12" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
              </div>
              <button type="submit" disabled={isLoading} className="btn-luxury w-full">{isLoading ? "Signing in..." : "Sign In"}</button>
            </form>
            <p className="text-center mt-6 text-muted-foreground">
              Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Create one</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
