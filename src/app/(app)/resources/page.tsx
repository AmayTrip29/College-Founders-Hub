"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileText, Search, Upload, Download, Loader2 } from "lucide-react";
import * as React from "react";

const resourcesData = [
  { id: 1, title: "YC Pitch Deck Template", author: "Y Combinator", type: "Pitch Deck", downloads: 1254, icon: <FileText className="h-10 w-10 text-destructive" /> },
  { id: 2, title: "SaaS Financial Model", author: "Alice Johnson", type: "Financial", downloads: 873, icon: <FileText className="h-10 w-10 text-primary" /> },
  { id: 3, title: "Lean Canvas Template", author: "Ash Maurya", type: "Template", downloads: 2345, icon: <FileText className="h-10 w-10 text-accent" /> },
  { id: 4, title: "Mobile App Wireframe Kit", author: "Bob Williams", type: "Design", downloads: 632, icon: <FileText className="h-10 w-10 text-green-500" /> },
  { id: 5, title: "Term Sheet Essentials", author: "VC & Founder Law", type: "Legal", downloads: 912, icon: <FileText className="h-10 w-10 text-gray-500" /> },
  { id: 6, title: "Growth Hacking Checklist", author: "Sean Ellis", type: "Marketing", downloads: 1890, icon: <FileText className="h-10 w-10 text-orange-500" /> },
];

export default function ResourcesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [downloading, setDownloading] = React.useState<number | null>(null);

  const handleDownload = (resourceId: number, resourceTitle: string) => {
    setDownloading(resourceId);
    toast({
      title: "Preparing Download...",
      description: `Your download for "${resourceTitle}" will begin shortly.`,
    });
    setTimeout(() => {
        setDownloading(null);
        // In a real app, you would trigger the file download here.
        // For this prototype, we'll just show a success message.
        toast({
            title: "Download Started!",
            description: `"${resourceTitle}" is now downloading.`
        });
    }, 1500);
  };
  
  const handleUpload = () => {
    // This would open a file picker dialog
    toast({
        title: "Upload Feature",
        description: "This would typically open a file dialog to upload a resource."
    })
  }

  const filteredResources = resourcesData.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Resource Hub</h1>
        <p className="text-muted-foreground">
          Share and discover useful resources like pitch decks and templates.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
        <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search for templates, decks, models..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              {resource.icon}
              <div className="flex-grow">
                <CardTitle className="font-headline text-lg mb-1">{resource.title}</CardTitle>
                <CardDescription>By {resource.author}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
               <Badge variant={
                resource.type === 'Pitch Deck' ? 'destructive' :
                resource.type === 'Financial' ? 'default' :
                resource.type === 'Template' ? 'outline' :
                resource.type === 'Design' ? 'secondary' :
                'default'
               }>{resource.type}</Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <span className="text-sm text-muted-foreground">{resource.downloads.toLocaleString()} downloads</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(resource.id, resource.title)}
                disabled={downloading === resource.id}
                >
                {downloading === resource.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
