import { useState } from "react";
import { MoreHorizontal, Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layout/PageLayout";

// Mock data for POS machines
const initialPOS = [
  {
    id: 1,
    name: "Main Office POS",
    agent: "John Doe",
    location: "Headquarters - 1st Floor",
    status: "Active",
    lastActive: "2025-03-12 14:30",
    transactions: 156,
  },
  {
    id: 2,
    name: "Downtown Branch POS",
    agent: "Jane Smith",
    location: "Downtown Branch - Counter 3",
    status: "Active",
    lastActive: "2025-03-12 16:45",
    transactions: 89,
  },
  {
    id: 3,
    name: "West Side POS",
    agent: "Robert Johnson",
    location: "West Side Branch - Main Hall",
    status: "Inactive",
    lastActive: "2025-03-01 09:15",
    transactions: 42,
  },
  {
    id: 4,
    name: "Mobile POS Unit 1",
    agent: "Sarah Williams",
    location: "Mobile Unit",
    status: "Active",
    lastActive: "2025-03-11 11:20",
    transactions: 67,
  },
  {
    id: 5,
    name: "East Side POS",
    agent: "Michael Brown",
    location: "East Side Branch - Counter 1",
    status: "Active",
    lastActive: "2025-03-12 10:05",
    transactions: 112,
  },
];

// Mock data for users/agents
const agents = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
  { id: 4, name: "Sarah Williams" },
  { id: 5, name: "Michael Brown" },
  { id: 6, name: "Emily Davis" },
];

export default function POSPage() {
  const [posDevices, setPosDevices] = useState(initialPOS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPOSOpen, setIsAddPOSOpen] = useState(false);
  const [isEditPOSOpen, setIsEditPOSOpen] = useState(false);
  const [currentPOS, setCurrentPOS] = useState<{
    id: number;
    name: string;
    agent: string;
    location: string;
    status: string;
  } | null>(null);
  const [newPOS, setNewPOS] = useState({
    name: "",
    agent: "",
    location: "",
    status: "Active",
  });

  // Filter POS devices based on search term
  const filteredPOS = posDevices.filter(
    (pos) =>
      pos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pos.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pos.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPOS = () => {
    const id = Math.max(...posDevices.map((pos) => pos.id)) + 1;
    const lastActive = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);

    setPosDevices([
      ...posDevices,
      {
        ...newPOS,
        id,
        lastActive,
        transactions: 0,
      },
    ]);

    setNewPOS({
      name: "",
      agent: "",
      location: "",
      status: "Active",
    });

    setIsAddPOSOpen(false);
  };

  const handleEditPOS = () => {
    if (currentPOS) {
      setPosDevices(
        posDevices.map((pos) =>
          pos.id === currentPOS.id
            ? {
                ...currentPOS,
                lastActive: pos.lastActive,
                transactions: pos.transactions,
              }
            : pos
        )
      );
    }
    setIsEditPOSOpen(false);
  };

  interface POSDevice {
    id: number;
    name: string;
    agent: string;
    location: string;
    status: string;
    lastActive: string;
    transactions: number;
  }

  const handleToggleStatus = (posId: number) => {
    setPosDevices(
      posDevices.map((pos: POSDevice) => {
        if (pos.id === posId) {
          return {
            ...pos,
            status: pos.status === "Active" ? "Inactive" : "Active",
          };
        }
        return pos;
      })
    );
  };

  const handleDeletePOS = (posId: number) => {
    if (confirm("Are you sure you want to delete this POS device?")) {
      setPosDevices(posDevices.filter((pos: POSDevice) => pos.id !== posId));
    }
  };

  const openEditModal = (pos: POSDevice) => {
    setCurrentPOS({ ...pos });
    setIsEditPOSOpen(true);
  };

  return (
    <Layout>
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            POS Machine Management
          </h1>
          <Dialog open={isAddPOSOpen} onOpenChange={setIsAddPOSOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add POS Machine
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New POS Machine</DialogTitle>
                <DialogDescription>
                  Register a new POS machine and assign it to an agent.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="pos-name">POS Name</Label>
                  <Input
                    id="pos-name"
                    value={newPOS.name}
                    onChange={(e) =>
                      setNewPOS({ ...newPOS, name: e.target.value })
                    }
                    placeholder="e.g. Main Office POS"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agent">Assigned Agent</Label>
                  <Select
                    value={newPOS.agent}
                    onValueChange={(value) =>
                      setNewPOS({ ...newPOS, agent: value })
                    }
                  >
                    <SelectTrigger id="agent">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.name}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newPOS.location}
                    onChange={(e) =>
                      setNewPOS({ ...newPOS, location: e.target.value })
                    }
                    placeholder="e.g. Headquarters - 1st Floor"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newPOS.status}
                    onValueChange={(value) =>
                      setNewPOS({ ...newPOS, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddPOSOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPOS}>Register POS</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All POS Machines</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All POS Machines</CardTitle>
                <CardDescription>
                  Manage all POS machines in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>POS Name</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPOS.map((pos) => (
                      <TableRow key={pos.id}>
                        <TableCell className="font-medium">
                          {pos.name}
                        </TableCell>
                        <TableCell>{pos.agent}</TableCell>
                        <TableCell>{pos.location}</TableCell>
                        <TableCell>
                          <span
                            className={
                              pos.status === "Active"
                                ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                                : "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                            }
                          >
                            {pos.status}
                          </span>
                        </TableCell>
                        <TableCell>{pos.lastActive}</TableCell>
                        <TableCell>{pos.transactions}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => openEditModal(pos)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(pos.id)}
                              >
                                {pos.status === "Active" ? (
                                  <>
                                    <X className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeletePOS(pos.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active POS Machines</CardTitle>
                <CardDescription>Manage active POS machines</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>POS Name</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPOS
                      .filter((pos) => pos.status === "Active")
                      .map((pos) => (
                        <TableRow key={pos.id}>
                          <TableCell className="font-medium">
                            {pos.name}
                          </TableCell>
                          <TableCell>{pos.agent}</TableCell>
                          <TableCell>{pos.location}</TableCell>
                          <TableCell>{pos.lastActive}</TableCell>
                          <TableCell>{pos.transactions}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => openEditModal(pos)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(pos.id)}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive POS Machines</CardTitle>
                <CardDescription>Manage inactive POS machines</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>POS Name</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPOS
                      .filter((pos) => pos.status === "Inactive")
                      .map((pos) => (
                        <TableRow key={pos.id}>
                          <TableCell className="font-medium">
                            {pos.name}
                          </TableCell>
                          <TableCell>{pos.agent}</TableCell>
                          <TableCell>{pos.location}</TableCell>
                          <TableCell>{pos.lastActive}</TableCell>
                          <TableCell>{pos.transactions}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => openEditModal(pos)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(pos.id)}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit POS Modal */}
        {currentPOS && (
          <Dialog open={isEditPOSOpen} onOpenChange={setIsEditPOSOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit POS Machine</DialogTitle>
                <DialogDescription>
                  Update POS machine information and settings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-pos-name">POS Name</Label>
                  <Input
                    id="edit-pos-name"
                    value={currentPOS.name}
                    onChange={(e) =>
                      setCurrentPOS({ ...currentPOS, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-agent">Assigned Agent</Label>
                  <Select
                    value={currentPOS.agent}
                    onValueChange={(value) =>
                      setCurrentPOS({ ...currentPOS, agent: value })
                    }
                  >
                    <SelectTrigger id="edit-agent">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.name}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={currentPOS.location}
                    onChange={(e) =>
                      setCurrentPOS({
                        ...currentPOS,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentPOS.status}
                    onValueChange={(value) =>
                      setCurrentPOS({ ...currentPOS, status: value })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditPOSOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditPOS}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </Layout>
  );
}
