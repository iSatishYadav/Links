using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Links.Models;
using Links.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.AspNetCore.Http;
using Links.Authorizations;

namespace Links
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAuthentication(sharedOptions =>
            {
                //sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                //sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            //.AddAzureAd(options => Configuration.Bind("AzureAd", options))
            //.AddCookie(); 
            .AddJwtBearer(options =>
            {
                //tenantId
                //options.Authority = "https://login.microsoftonline.com/222f3a7c-d45e-4818-9aa4-33d44420ec32";
                options.Authority = $"{Configuration["AzureAd:Instance"]}/{Configuration["AzureAd:TenantId"]}/v2.0";
                //clientId Azure Pers
                //options.Audience = "69283aab-51de-414d-958b-22923a9c22d9";
                // Azure Corp Converged
                //options.Audience = "1023a461-77c7-4996-91e4-274400561485";
                options.Audience = Configuration["AzureAd:ClientId"];
                options.TokenValidationParameters.ValidateLifetime = true;
                options.TokenValidationParameters.NameClaimType = "preferred_username";
                options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
            });

            services.AddAuthorization(options =>
            {
                //options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            services.AddMvc()
            .AddRazorPagesOptions(options =>
            {
                options.Conventions.AllowAnonymousToFolder("/Account");
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddDbContext<LinksContext>(options =>
                   options.UseSqlServer(Configuration.GetConnectionString("LinksContext")));

            services.AddTransient<IDataRepository, DataRepository>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseAuthentication();

            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowCredentials()
            .AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                //routes.MapRoute(
                //   name: "RedirectToLink",
                //   template: "r/{url}");
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
