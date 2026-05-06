"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const availableTasksData = [
  { id: 1, title: "Design a landing page mockup", reward: "500 Points", skills: ["UI/UX", "Figma"], author: "Alice J." },
  { id: 2, title: "Develop a REST API for user auth", reward: "Collaboration Invite", skills: ["Node.js", "Backend"], author: "Bob W." },
  { id: 3, title: "Write a blog post on Gen Z marketing", reward: "250 Points", skills: ["Writing", "Marketing"], author: "Charlie B." },
  { id: 4, title: "Create a Webflow animation", reward: "300 Points", skills: ["Webflow", "Design"], author: "Diana M." },
  { id: 5, title: "Beta test a new mobile app", reward: "100 Points", skills: ["QA", "Mobile"], author: "Ethan D." },
];

const myTasksData = [
    { id: 6, title: "Set up a new Firebase project", reward: "150 Points", status: "In Progress" },
    { id: 7, title: "Review a pitch deck for clarity", reward: "100 Points", status: "Completed" },
]

export default function TasksPage() {
  const { toast } = useToast();

  const handleApply = (taskTitle: string) => {
    toast({
        title: "Application Sent!",
        description: `Your application for "${taskTitle}" has been submitted.`
    });
  };

  const handleNewTask = () => {
    toast({
        title: "Create a New Task",
        description: "A form would appear here to create a new task for the community."
    })
  }
  
  const handleManageTask = () => {
     toast({
        title: "Manage Task",
        description: "You would be taken to a page to manage this task's applicants and status."
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Task Exchange</h1>
          <p className="text-muted-foreground">
            Find collaborators or offer your skills to other founders.
          </p>
        </div>
        <Button onClick={handleNewTask}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Post a New Task
        </Button>
      </div>

      <Tabs defaultValue="available">
        <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTasksData.map((task) => (
                <Card key={task.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">{task.title}</CardTitle>
                        <CardDescription>Posted by {task.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">Reward</p>
                            <Badge variant="default">{task.reward}</Badge>
                        </div>
                        <div>
                            <p className="text-sm font-semibold mb-2">Skills Needed</p>
                            <div className="flex flex-wrap gap-2">
                            {task.skills.map(skill => <Badge variant="secondary" key={skill}>{skill}</Badge>)}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <Button className="w-full" onClick={() => handleApply(task.title)}>View & Apply</Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="my-tasks" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {myTasksData.map((task) => (
                <Card key={task.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">{task.title}</CardTitle>
                        <CardDescription>Reward: {task.reward}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm font-semibold mb-2">Status</p>
                        <Badge variant={task.status === 'Completed' ? 'secondary' : 'default'}>{task.status}</Badge>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <Button variant="outline" className="w-full" onClick={handleManageTask}>Manage Task</Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
