using Crud_Jquery.Models;
using Crud_Jquery.Models.Context;
using Crud_Jquery.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Crud_Jquery.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyContext db; //****

        public HomeController(ILogger<HomeController> logger,MyContext _myContext)//****
        {
            _logger = logger;
            db = _myContext;//****
            
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Products()
        {
            return View();
        }
        public JsonResult ProductList()
        {
            var data =db.Products.ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddProduct([FromBody]Product product)
        {
            var data = new Product()
            {
                ProductName = product.ProductName,
                CategoryId = product.CategoryId,
                BrandId = product.BrandId,
                Description = product.Description,
            };
            db.Products.Add(data);
            db.SaveChanges();
            return new JsonResult("Veri kaydedildi!!!!");
        }
        public JsonResult DeleteProduct(int id)
        {
            var deletedData = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
            db.Products.Remove(deletedData);
            db.SaveChanges();
            return new JsonResult("Veri silindi");
        }

        public JsonResult VeriGetir(int id)
        {
            var data = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult UpdateProduct([FromBody] Product product)
        {

            db.Products.Update(product);
            db.SaveChanges();
            return new JsonResult("Veri güncellendi");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}