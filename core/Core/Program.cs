using ElectronCgi.DotNet;

namespace Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();
            
            connection.On("greeting", (string name) => 
            {
                return $"Hello {name}";
            });
            
            connection.Listen();    
        }
    }
}