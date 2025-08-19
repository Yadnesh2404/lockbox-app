import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Globe, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
  created_at: string;
}

interface PasswordCardProps {
  entry: PasswordEntry;
  onDelete: (id: string) => void;
}

export const PasswordCard = ({ entry, onDelete }: PasswordCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `${type} copied!`,
        description: "Successfully copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getMaskedPassword = () => {
    return "•".repeat(entry.password.length);
  };

  const handleDelete = () => {
    onDelete(entry.id);
    toast({
      title: "Password deleted",
      description: "Password entry has been removed",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in border-border/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-float">
              <Globe className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{entry.website}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive transition-colors"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between py-2 px-3 bg-gradient-to-r from-muted to-muted/80 rounded-md backdrop-blur-sm border border-border/30">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-mono">{entry.username}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-primary/20 hover:text-primary transition-all duration-200"
            onClick={() => copyToClipboard(entry.username, "Username")}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between py-2 px-3 bg-gradient-to-r from-muted to-muted/80 rounded-md backdrop-blur-sm border border-border/30">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">
              {showPassword ? entry.password : getMaskedPassword()}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-primary/20 hover:text-primary transition-all duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200"
              onClick={() => copyToClipboard(entry.password, "Password")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};