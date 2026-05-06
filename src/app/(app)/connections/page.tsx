"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, UserPlus, Check } from "lucide-react";
import * as React from "react";

const connectionsData = [
  { id: 1, name: 'Sophia Chen', title: 'AI/ML Developer', university: 'Stanford University', avatar: 'https://placehold.co/40x40.png?text=SC', skills: ['Python', 'TensorFlow', 'NLP'] },
  { id: 2, name: 'Liam Rodriguez', title: 'UX/UI Designer', university: 'Carnegie Mellon', avatar: 'https://placehold.co/40x40.png?text=LR', skills: ['Figma', 'User Research', 'Prototyping'] },
  { id: 3, name: 'Olivia Garcia', title: 'Marketing & Growth Hacker', university: 'UPenn', avatar: 'https://placehold.co/40x40.png?text=OG', skills: ['SEO', 'Content Marketing', 'Social Media'] },
  { id: 4, name: 'Noah Nguyen', title: 'Backend Engineer', university: 'UC Berkeley', avatar: 'https://placehold.co/40x40.png?text=NN', skills: ['Node.js', 'Go', 'Databases'] },
  { id: 5, name: 'Emma Goldstein', title: 'Product Manager', university: 'Harvard University', avatar: 'https://placehold.co/40x40.png?text=EG', skills: ['Agile', 'Roadmapping', 'User Stories'] },
  { id: 6, name: 'James Kim', title: 'Frontend Developer', university: 'MIT', avatar: 'https://placehold.co/40x40.png?text=JK', skills: ['React', 'Next.js', 'TypeScript'] },
];

export default function ConnectionsPage() {
  const { toast } = useToast();
  const [connections, setConnections] = React.useState(connectionsData);
  const [connected, setConnected] = React.useState<number[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleConnect = (userId: number, userName: string) => {
    setConnected((prev) => [...prev, userId]);
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}.`,
    });
  };
  
  const filteredConnections = connections.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Connections</h1>
        <p className="text-muted-foreground">
          Find and connect with other founders and innovators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <CardTitle className="font-headline">Find Innovators</CardTitle>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, skill, or university..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((user) => (
            <Card key={user.id} className="flex flex-col">
              <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold font-headline text-lg">{user.name}</h3>
                <p className="text-primary">{user.title}</p>
                <p className="text-sm text-muted-foreground mb-3">{user.university}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {user.skills.map(skill => <Badge variant="secondary" key={skill}>{skill}</Badge>)}
                </div>
              </CardContent>
              <div className="p-4 border-t">
                 <Button 
                    className="w-full" 
                    onClick={() => handleConnect(user.id, user.name)}
                    disabled={connected.includes(user.id)}
                  >
                    {connected.includes(user.id) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Connect
                      </>
                    )}
                </Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
