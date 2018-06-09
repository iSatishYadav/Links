using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Links.Data
{
    public partial class Stats
    {
        [JsonProperty("clicks")]
        public long Clicks { get; set; }

        [JsonProperty("log")]
        public Log[] Log { get; set; }
    }

    public partial class Log
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("timestamp")]
        public DateTime Timestamp { get; set; }

        [JsonProperty("ip")]
        public string Ip { get; set; }
    }

    public partial class Stats
    {
        public static Stats FromJson(string json) => string.IsNullOrEmpty(json) ? null : JsonConvert.DeserializeObject<Stats>(json, Converter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this Stats self) => self == null ? null : JsonConvert.SerializeObject(self, Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
