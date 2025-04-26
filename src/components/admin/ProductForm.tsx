
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Product } from "@/types/product";
import { categories, colors, types } from "@/data/mockData";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: categories[0],
    inStock: true,
    color: colors[0],
    type: types[0]
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        inStock: product.inStock,
        color: product.color,
        type: product.type
      });
      setImagePreview(product.imageUrl);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      inStock: checked
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      imageUrl: value
    }));
    if (value) {
      setImagePreview(value);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!formData.imageUrl.match(/^(https?:\/\/)/i)) {
      newErrors.imageUrl = "Please enter a valid URL starting with http:// or https://";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      
      <div>
        <Label htmlFor="price">Price (₹)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleInputChange}
          className={errors.price ? "border-red-500" : ""}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleImageUrlChange}
          placeholder="https://example.com/image.jpg"
          className={errors.imageUrl ? "border-red-500" : ""}
        />
        {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
        
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <div className="border border-gray-200 rounded-md p-2 w-24 h-24">
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-full h-full object-cover rounded"
                onError={() => {
                  setImagePreview(null);
                  toast.error("Invalid image URL");
                }} 
              />
            </div>
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Select
          value={formData.color}
          onValueChange={(value) => handleSelectChange("color", value)}
        >
          <SelectTrigger id="color">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="capitalize">{color}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                <span className="capitalize">{type}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="inStock" 
          checked={formData.inStock} 
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-brand hover:bg-brand/90">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
