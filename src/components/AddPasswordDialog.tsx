import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPasswordDialogProps {
  onAdd: (data: { website: string; username: string; password: string }) => void;
}

export const AddPasswordDialog = ({ onAdd }: AddPasswordDialogProps) => {
  const [open, setOpen] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!website || !username || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAdd({ website, username, password });
    setWebsite("");
    setUsername("");
    setPassword("");
    setOpen(false);
    
    toast({
      title: "Password added!",
      description: "Successfully saved your password",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-105">
          <Plus className="w-4 h-4" />
          Add Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card via-card to-accent/20 backdrop-blur-sm border-border/50 animate-scale-in">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input
              id="username"
              placeholder="your@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Save Password
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};