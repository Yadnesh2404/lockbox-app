import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, KeyRound } from "lucide-react";
import { PasswordCard } from "@/components/PasswordCard";
import { AddPasswordDialog } from "@/components/AddPasswordDialog";

interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
  created_at: string;
}

const Index = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demo - in real app this would come from Supabase
  useEffect(() => {
    const mockData: PasswordEntry[] = [
      {
        id: "1",
        website: "github.com",
        username: "developer@email.com",
        password: "SecurePass123!",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        website: "google.com",
        username: "user@gmail.com",
        password: "MyPassword456",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    setPasswords(mockData);
  }, []);

  const handleDeletePassword = (id: string) => {
    setPasswords(passwords.filter(password => password.id !== id));
  };

  const handleAddPassword = (data: { website: string; username: string; password: string }) => {
    const newPassword: PasswordEntry = {
      id: Date.now().toString(),
      ...data,
      created_at: new Date().toISOString(),
    };
    setPasswords([newPassword, ...passwords]);
  };

  const filteredPasswords = passwords.filter(
    (password) =>
      password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" style={{animationDelay: '-1.5s'}}></div>
      </div>
      
      <div className="container max-w-4xl mx-auto py-8 px-4 relative z-10">
        <header className="text-center mb-8 animate-slide-down">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center animate-float shadow-lg shadow-primary/30">
              <KeyRound className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Password Manager</h1>
          </div>
          <p className="text-muted-foreground">
            Keep your passwords secure and organized
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-200 focus:bg-card focus:border-primary/50"
            />
          </div>
          <AddPasswordDialog onAdd={handleAddPassword} />
        </div>

        {filteredPasswords.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <KeyRound className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-float" />
            <h3 className="text-lg font-medium mb-2">No passwords found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search" : "Get started by adding your first password"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
            {filteredPasswords.map((password) => (
              <PasswordCard key={password.id} entry={password} onDelete={handleDeletePassword} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;