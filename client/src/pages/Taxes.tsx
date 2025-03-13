import { useState } from "react";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout/PageLayout";

const initialTaxes = [
  {
    id: 1,
    name: "Income Tax",
    code: "INC-TAX",
    description: "Standard income tax for individuals",
    rate: 15 as number,
    hasFixedAmount: false,
    fixedAmount: null as null,
    status: "Active",
    lastUpdated: "2025-02-15",
  },
  {
    id: 2,
    name: "Property Tax",
    code: "PROP-TAX",
    description: "Tax on property ownership",
    rate: 2.5 as number,
    hasFixedAmount: false,
    fixedAmount: null as null,
    status: "Active",
    lastUpdated: "2025-01-20",
  },
  {
    id: 3,
    name: "Sales Tax",
    code: "SALES-TAX",
    description: "Tax on sales of goods and services",
    rate: 7 as number,
    hasFixedAmount: false,
    fixedAmount: null as null,
    status: "Active",
    lastUpdated: "2025-03-01",
  },
  {
    id: 4,
    name: "VAT",
    code: "VAT",
    description: "Value Added Tax",
    rate: 20 as number,
    hasFixedAmount: false,
    fixedAmount: null as null,
    status: "Active",
    lastUpdated: "2025-02-28",
  },
  {
    id: 5,
    name: "Business Registration Fee",
    code: "BRF",
    description: "Fixed fee for business registration",
    rate: null as null,
    hasFixedAmount: true,
    fixedAmount: 250 as number,
    status: "Active",
    lastUpdated: "2025-01-10",
  },
  {
    id: 6,
    name: "Luxury Tax",
    code: "LUX-TAX",
    description: "Tax on luxury items",
    rate: 10 as number,
    hasFixedAmount: false,
    fixedAmount: null as null,
    status: "Inactive",
    lastUpdated: "2024-12-15",
  },
];

export default function TaxesPage() {
  const [taxes, setTaxes] = useState(initialTaxes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTaxOpen, setIsAddTaxOpen] = useState(false);
  const [isEditTaxOpen, setIsEditTaxOpen] = useState(false);
  const [currentTax, setCurrentTax] = useState<{
    id: number;
    name: string;
    code: string;
    description: string;
    rate: number | null;
    hasFixedAmount: boolean;
    fixedAmount: number | null;
    status: string;
    lastUpdated: string;
  } | null>(null);
  const [newTax, setNewTax] = useState<{
    name: string;
    code: string;
    description: string;
    rate: number | null;
    hasFixedAmount: boolean;
    fixedAmount: number | null;
    status: string;
  }>({
    name: "",
    code: "",
    description: "",
    rate: null,
    hasFixedAmount: false,
    fixedAmount: null,
    status: "Active",
  });

  // Filter taxes based on search term
  const filteredTaxes = taxes.filter(
    (tax) =>
      tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tax.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tax.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTax = () => {
    // const id = Math.max(...taxes.map((tax) => tax.id)) + 1;
    // const lastUpdated = new Date().toISOString().split("T")[0];

    // setTaxes([...taxes, { ...newTax, id, lastUpdated }]);

    setNewTax({
      name: "",
      code: "",
      description: "",
      rate: null,
      hasFixedAmount: false,
      fixedAmount: null,
      status: "Active",
    });
    setIsAddTaxOpen(false);
  };

  const handleEditTax = () => {
    if (currentTax) {
      //   setTaxes(
      //     taxes.map((tax) => (tax.id === currentTax.id ? currentTax : tax))
      //   );
    }
    setIsEditTaxOpen(false);
  };

  const handleToggleStatus = (taxId: any) => {
    setTaxes(
      taxes.map((tax) => {
        if (tax.id === taxId) {
          return {
            ...tax,
            status: tax.status === "Active" ? "Inactive" : "Active",
          };
        }
        return tax;
      })
    );
  };

  const handleDeleteTax = (taxId: number) => {
    if (confirm("Are you sure you want to delete this tax?")) {
      setTaxes(taxes.filter((tax) => tax.id !== taxId));
    }
  };

  const openEditModal = (tax: (typeof initialTaxes)[0]) => {
    setCurrentTax({ ...tax });
    setIsEditTaxOpen(true);
  };

  return (
    <Layout>
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Tax Management</h1>
          <Dialog open={isAddTaxOpen} onOpenChange={setIsAddTaxOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Tax
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Tax</DialogTitle>
                <DialogDescription>
                  Create a new tax with rate or fixed amount.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Tax Name</Label>
                    <Input
                      id="name"
                      value={newTax.name}
                      onChange={(e) =>
                        setNewTax({ ...newTax, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Tax Code</Label>
                    <Input
                      id="code"
                      value={newTax.code}
                      onChange={(e) =>
                        setNewTax({ ...newTax, code: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTax.description}
                    onChange={(e) =>
                      setNewTax({ ...newTax, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Tax Type</Label>
                  <RadioGroup
                    defaultValue={
                      newTax.hasFixedAmount ? "fixed" : "percentage"
                    }
                    onValueChange={(value) => {
                      setNewTax({
                        ...newTax,
                        hasFixedAmount: value === "fixed",
                        rate: value === "fixed" ? null : newTax.rate || 0,
                        fixedAmount:
                          value === "fixed" ? newTax.fixedAmount || 0 : null,
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Percentage Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                {newTax.hasFixedAmount ? (
                  <div className="grid gap-2">
                    <Label htmlFor="fixed-amount">Fixed Amount</Label>
                    <Input
                      id="fixed-amount"
                      type="number"
                      value={newTax.fixedAmount || ""}
                      onChange={(e) =>
                        setNewTax({
                          ...newTax,
                          fixedAmount: isNaN(Number.parseFloat(e.target.value))
                            ? null
                            : Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="rate">Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={newTax.rate || ""}
                      onChange={(e) =>
                        setNewTax({
                          ...newTax,
                          rate: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTax.status}
                    onValueChange={(value) =>
                      setNewTax({ ...newTax, status: value })
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
                  onClick={() => setIsAddTaxOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddTax}>Create Tax</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Taxes</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Taxes</CardTitle>
                <CardDescription>
                  Manage all tax types in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Rate/Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTaxes.map((tax) => (
                      <TableRow key={tax.id}>
                        <TableCell className="font-medium">
                          {tax.name}
                        </TableCell>
                        <TableCell>{tax.code}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {tax.description}
                        </TableCell>
                        <TableCell>
                          {tax.hasFixedAmount
                            ? `$${tax.fixedAmount?.toFixed(2) ?? "0.00"}`
                            : `${tax.rate}%`}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              tax.status === "Active"
                                ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                                : "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                            }
                          >
                            {tax.status}
                          </span>
                        </TableCell>
                        <TableCell>{tax.lastUpdated}</TableCell>
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
                                onClick={() => openEditModal(tax)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(tax.id)}
                              >
                                {tax.status === "Active" ? (
                                  <>
                                    <Trash2 className="mr-2 h-4 w-4" />
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
                                onClick={() => handleDeleteTax(tax.id)}
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
                <CardTitle>Active Taxes</CardTitle>
                <CardDescription>Manage active tax types</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Rate/Amount</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTaxes
                      .filter((tax) => tax.status === "Active")
                      .map((tax) => (
                        <TableRow key={tax.id}>
                          <TableCell className="font-medium">
                            {tax.name}
                          </TableCell>
                          <TableCell>{tax.code}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {tax.description}
                          </TableCell>
                          <TableCell>
                            {tax.hasFixedAmount
                              ? `$${(tax.fixedAmount ?? 0).toFixed(2)}`
                              : `${tax.rate}%`}
                          </TableCell>
                          <TableCell>{tax.lastUpdated}</TableCell>
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
                                  onClick={() => openEditModal(tax)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(tax.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
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
                <CardTitle>Inactive Taxes</CardTitle>
                <CardDescription>Manage inactive tax types</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Rate/Amount</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTaxes
                      .filter((tax) => tax.status === "Inactive")
                      .map((tax) => (
                        <TableRow key={tax.id}>
                          <TableCell className="font-medium">
                            {tax.name}
                          </TableCell>
                          <TableCell>{tax.code}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {tax.description}
                          </TableCell>
                          <TableCell>
                            {tax.hasFixedAmount
                              ? `$${(tax.fixedAmount ?? 0).toFixed(2)}`
                              : `${tax.rate}%`}
                          </TableCell>
                          <TableCell>{tax.lastUpdated}</TableCell>
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
                                  onClick={() => openEditModal(tax)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(tax.id)}
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

        {/* Edit Tax Modal */}
        {currentTax && (
          <Dialog open={isEditTaxOpen} onOpenChange={setIsEditTaxOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Tax</DialogTitle>
                <DialogDescription>
                  Update tax information and settings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Tax Name</Label>
                    <Input
                      id="edit-name"
                      value={currentTax.name}
                      onChange={(e) =>
                        setCurrentTax({ ...currentTax, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-code">Tax Code</Label>
                    <Input
                      id="edit-code"
                      value={currentTax.code}
                      onChange={(e) =>
                        setCurrentTax({ ...currentTax, code: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={currentTax.description}
                    onChange={(e) =>
                      setCurrentTax({
                        ...currentTax,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Tax Type</Label>
                  <RadioGroup
                    value={currentTax.hasFixedAmount ? "fixed" : "percentage"}
                    onValueChange={(value) => {
                      setCurrentTax({
                        ...currentTax,
                        hasFixedAmount: value === "fixed",
                        rate: value === "fixed" ? null : currentTax.rate ?? 0,
                        fixedAmount:
                          value === "fixed"
                            ? currentTax.fixedAmount || 0
                            : null,
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="edit-percentage" />
                      <Label htmlFor="edit-percentage">Percentage Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="edit-fixed" />
                      <Label htmlFor="edit-fixed">Fixed Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                {currentTax.hasFixedAmount ? (
                  <div className="grid gap-2">
                    <Label htmlFor="edit-fixed-amount">Fixed Amount</Label>
                    <Input
                      id="edit-fixed-amount"
                      type="number"
                      value={currentTax.fixedAmount || ""}
                      onChange={(e) =>
                        setCurrentTax({
                          ...currentTax,
                          fixedAmount: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="edit-rate">Rate (%)</Label>
                    <Input
                      id="edit-rate"
                      type="number"
                      value={currentTax.rate || ""}
                      onChange={(e) =>
                        setCurrentTax({
                          ...currentTax,
                          rate: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentTax.status}
                    onValueChange={(value) =>
                      setCurrentTax({ ...currentTax, status: value })
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
                  onClick={() => setIsEditTaxOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditTax}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </Layout>
  );
}
