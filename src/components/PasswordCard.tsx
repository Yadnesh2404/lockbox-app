import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Globe, User } from "lucide-react";
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
}

export const PasswordCard = ({ entry }: PasswordCardProps) => {
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

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{entry.website}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-mono">{entry.username}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => copyToClipboard(entry.username, "Username")}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">
              {showPassword ? entry.password : getMaskedPassword()}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
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