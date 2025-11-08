"use client"
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import React, { useState } from 'react'
import { PropertyFormData } from '../types'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


interface PropertyFormProps{
    initialData? : Partial<PropertyFormData>
   isEditing?: boolean;
  propertyId?: string;
}

function PropertyForm({initialData, isEditing = false, propertyId}: PropertyFormProps) {

    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const createProperty = useMutation(api.properties.createProperty)
    const updateProperty  = useMutation(api.properties.updateProperty)
    

    const [formData, setFormData] = useState({
    title :initialData?.title || "",
    description:initialData?.description || "",
    price: initialData?.price || 0,
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    area: initialData?.area || 0,
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    propertyType: initialData?.propertyTye || "house",
    status: initialData?.status || "for-sale",
    images: initialData?.images || [],
    featured: initialData?.featured || false,
    })    

    const handleInputChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
            const {name, value, type} = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: ['price', 'bedrooms', 'bathrooms', 'area'].includes(name) ? Number(value) : value,
            }))
        }


      const handleCheckboxChange  = (
        e:React.ChangeEvent<HTMLInputElement >)=>{
            const {name, checked} = e.target;
            setFormData(prev => ({
                ...prev,
                [name]:checked,
            }))
        }   
    
    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()

        try {
            if(isEditing && propertyId){
                await updateProperty({
                    id: propertyId as any,
                    ...formData
                })
            }else{
                await createProperty(formData);
            }
            router.push("/properties");
        } catch (error) {
         console.error("Error saving property:", error);
      alert("Failed to save property. Please try again.");
        }
    }

    const handleImageUpload = async(e:React.ChangeEvent<HTMLInputElement>)=> {
            const files = e.target.files
            if (!files) return;

            setIsUploading(true);

            const uploadedImages : string[] = []
            try {
                for(const file of Array.from(files)){
                  const formData = new FormData()
                  formData.append("file", file)  

                  const response = await fetch("/api/upload",{
                    method:"POST",
                    body:formData
                  })

                  if (!response.ok) {
                    throw new Error("Upload failed");
                  }

                  const {url} = await response.json()
                  uploadedImages.push(url)
                  }

            setFormData(prev => ({
                ...prev,
                images:[...prev.images, ...uploadedImages ]
            }))    
            } catch (error) {
              console.error("Upload error:", error);
              alert("Failed to upload images. Please try again."); 
              }finally{
                setIsUploading(false);
            }


    }   
  return (
    <form  onSubmit={handleSubmit} className='space-y-6'>
          {/* Basic Information */}

      <div className='bg-white p-6 rounded-lg shadow-sm border'>
        <h3>Basic Information</h3>

        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className='md:col-span-2'>

                <label className='block text-sm font-medium text-gray-700 mb-1'>Property Title *</label>

                <input type="text" name="title" value={formData?.title} onChange={handleInputChange} required className='w-full p-3 border border-gray-300 rounded'/>


            </div>


            <div className='md:col-span-2'>

                <label className='block text-sm font-medium text-gray-700 mb-1'>Property Description *</label>

             <textarea 
            
             name="description"
             value={formData?.description}
             onChange={handleInputChange}
             required
             className='w-full p-3 border border-gray-300 rounded'


             >
             </textarea>

             
            </div>

         <div >

                <label className='block text-sm font-medium text-gray-700 mb-1'>Price *</label>

             <input 
             type="number"
             name="price"
             value={formData.price}
             onChange={handleInputChange}
             required
             className='w-full p-3 border border-gray-300 rounded'


             />


         </div>   


         <div >

                <label className='block text-sm font-medium text-gray-700 mb-1'>Area *</label>

             <input 
             type="number"
             name="area"
             value={formData.area}
             onChange={handleInputChange}
             required
             className='w-full p-3 border border-gray-300 rounded'


             />


            </div> 
        </div>

       

        

      </div>   

       {/* Property Details */}

      <div className='bg-white p-6 rounded-lg shadow-sm border'>

            <h3>Property Details</h3>

     <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>

        <div>
       <label className='block text-sm font-medium text-gray-700 mb-1'>  Bedrooms *</label>

       <select name='bedrooms' value={formData?.bedrooms}
        onChange={handleInputChange}
        className='w-full p-3 border border-gray-300 rounded'
       required
       >

        {[1,2,3,4,5,6].map((num )=> (
            <option key={num} value={num}>{num}</option>
        ))}

       </select>
        </div>



        <div>
       <label className='block text-sm font-medium text-gray-700 mb-1'>  Bathrooms *</label>

       <select name='bathrooms' value={formData?.bathrooms}
        onChange={handleInputChange}
        className='w-full p-3 border border-gray-300 rounded'
       required
       >

        {[1,2,3,4,5,6].map((num )=> (
            <option key={num} value={num}>{num}</option>
        ))}

       </select>
        </div>


         <div>
       <label className='block text-sm font-medium text-gray-700 mb-1'>  Property Type *</label>

       <select name='propertyType' value={formData?.propertyType}
        onChange={handleInputChange}
        className='w-full p-3 border border-gray-300 rounded'
       required
       >

        <option value="house">House</option>
         <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
         <option value="townhouse">Townhouse</option>
       </select>
        </div>



       <div>
       <label className='block text-sm font-medium text-gray-700 mb-1'>  Status *</label>

       <select name='status' value={formData?.status}
        onChange={handleInputChange}
        className='w-full p-3 border border-gray-300 rounded'
       required
       >

        <option value="for-sale">For Sale</option>
          <option value="for-rent">For Rent</option>
           <option value="sold">Sold</option>
          <option value="rented">Rented</option>
       </select>
        </div>  



        <div>
  <label className='block text-sm font-medium text-gray-700 mb-2'>
    Featured Property *
  </label>
  
  <div className='flex items-center mb-3'>
    <input 
      type="checkbox"
      name="featured"  
      checked={formData.featured}  
      onChange={handleCheckboxChange}
      className='h-4 w-4  border-gray-300 rounded '
    />
    <span className='ml-2  text-sm text-gray-700'>
      Mark as featured property
    </span>
  </div>
</div> 


    
        </div> 




        <div >

           <label className='block text-sm font-medium text-gray-700 mb-1'>Address *</label>

             <input 
             type="text"
             name="address"
             value={formData.address}
             onChange={handleInputChange}
             required
             className='w-full p-3 border border-gray-300 rounded'


             />


            </div> 



        
        <div >

           <label className='block text-sm font-medium text-gray-700 mb-1'>City *</label>

             <input 
             type="text"
             name="city"
             value={formData.city}
             onChange={handleInputChange}
             required
             className='w-full p-3 border border-gray-300 rounded'


             />


            </div> 



         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md "
           
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md "
            
            />
          </div>
        </div>

           {/* Upload Button */}
            <label>
           <div className='mb-4'>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>

           <Upload className='h-8 w-8 text-gray-400 mx-auto mb-2'/>

             {isUploading ? "Uploading..." : "Click to upload images"}    
            </div>
            <input 
             type="file"
              multiple
             accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
             className="hidden"
            />
           </div>

        {/* Submit Button */}

            </label>

         {/* Image Preview */}

         {formData?.images?.length > 0  && (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
             {formData?.images?.map((imageUrl, index)=> (
                <Image alt='images' width={150} height={200} src={imageUrl}/>
             ))}   
            </div>
         )}    
        <Button  type="submit" >Create Property</Button>   
    </form>
  )
}

export default PropertyForm